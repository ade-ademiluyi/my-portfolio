// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either exptimeBetweens or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import java.util.Set;
import java.util.HashSet;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;


public final class FindMeetingQuery {
    public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {

        //this gets the list of optional attendees for the requested meeting
        Set<String> optionalAttendees = new HashSet<>();
        for(String attendee: request.getOptionalAttendees()) {
            optionalAttendees.add(attendee);
        }
        
        //this gets the list of attendees for the requested meeting
        Set<String> mandatoryAttendees = new HashSet<>();
        for(String attendee: request.getAttendees()) {
            mandatoryAttendees.add(attendee);
        }

        //this gets the duration of the requested meeting
        int duration = (int)request.getDuration();

        //IF NO mandatoryAttendees IS IN THE MEETING
        if (mandatoryAttendees.size() == 0) 
        {
            ArrayList<TimeRange> timesExcluded = new ArrayList<>();
            //CHECKS IF the optional attendees have any other event then stotimeBetween that time to avoid
            for(Event event: events) {
                if(!Collections.disjoint(event.getAttendees(), optionalAttendees)) {
                    timesExcluded.add(event.getWhen());
                }
            }
            
            return timeAvailable(timesExcluded, duration);
        } 
        else 
        {
            //checks if mandatory or optional attendees have any other meeting then exclude that time
            ArrayList<TimeRange> timesExcluded = new ArrayList<>();
            for(Event event: events) {
                if(!Collections.disjoint(event.getAttendees(), mandatoryAttendees) || !Collections.disjoint(event.getAttendees(), optionalAttendees)) {
                    timesExcluded.add(event.getWhen());
                }
            }

            
            Collection<TimeRange> ans = timeAvailable(timesExcluded, duration);
            if(ans.size() != 0) return ans;

            //checks if mandatory attendees have any other meeting then avoid that time
            timesExcluded = new ArrayList<>();
            for(Event event: events) {
                if(!Collections.disjoint(event.getAttendees(), mandatoryAttendees)) {
                    timesExcluded.add(event.getWhen());
                }
            }
            return timeAvailable(timesExcluded, duration);
         }
    }

    public Collection<TimeRange> timeAvailable(ArrayList<TimeRange> timesExcluded, int duration) {
        // get rid of the intervals within larger intervals
        int latestTime = -1;
        Collections.sort(timesExcluded, TimeRange.ORDER_BY_START);
        ArrayList<TimeRange> filteredtimesExcluded = new ArrayList<>();
        for(TimeRange timeRan: timesExcluded) {
            if(timeRan.end() > latestTime) {
                latestTime = timeRan.end();
                filteredtimesExcluded.add(timeRan);
            }
        }

        // collecting the times in between
        Collection<TimeRange> timeBetween = new ArrayList<>();
        int counterStart = TimeRange.START_OF_DAY;
        for(TimeRange timeRan: filteredtimesExcluded) {
            if(timeRan.start() - counterStart >= duration) {
                timeBetween.add(TimeRange.fromStartEnd(counterStart, timeRan.start(), false));
            }
            counterStart = timeRan.end();
        }
        if(TimeRange.END_OF_DAY+1 - counterStart >= duration)
            timeBetween.add(TimeRange.fromStartEnd(counterStart, TimeRange.END_OF_DAY+1, false));
        return timeBetween;
    }
}
