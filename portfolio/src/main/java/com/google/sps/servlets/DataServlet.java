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
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import com.google.sps.data.Comment;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Query query = new Query("Comment").addSort("timestamp", SortDirection.DESCENDING);
    
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);
    //int num_of_comments = getNumComments(request);
    //int counter = 0;

    List<Comment> comments = new ArrayList<>();
    for (Entity entity : results.asIterable()) {
      //counter++;
      //if(counter > num_of_comments) break;
      long id = entity.getKey().getId();
      String comment_left = (String) entity.getProperty("comment_left");
      long timestamp = (long) entity.getProperty("timestamp");

      Comment comment_id = new Comment(id, comment_left, timestamp);
      comments.add(comment_id);
    }

    Gson gson = new Gson();
    
    response.setContentType("application/json;");
    response.getWriter().println(gson.toJson(comments));
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Get the input from the form.
    String comment_left = getuserComment(request);
    long timestamp = System.currentTimeMillis();

    Entity taskEntity = new Entity("Comment");
    taskEntity.setProperty("comment_left", comment_left);
    taskEntity.setProperty("timestamp", timestamp);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(taskEntity);

    // Redirect back to the HTML page.
    response.sendRedirect("/index.html");
  }

  /** Returns the comment entered by the user. */
  private String getuserComment(HttpServletRequest request) {
    // Get the input from the form.
    String playerChoiceString = request.getParameter("comment_left");

    return playerChoiceString;
  }

//   private int getNumComments(HttpServletRequest request) {
//         return Integer.parseInt(request.getParameter("num_comments"));
//     }
}
