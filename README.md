# Kingsmen - City Inspections Dashboard

City inspections dashboard provides an interface to view and edit the inspection data that takes place in various cities based in New York state. It provides a lightweight interface for manipulating the inspection data.
The city inspections data is a collection of about 86000 records. This data is about the inspection of various commercial spaces situated in various cities in the New York state. The inspection results are also recorded in the dataset.

For this project, I have used Mongo-Express-Node stack and divided the project into two phases
1. Front end UI logic (Node+Express, HTML+JavaScript+CSS)
    The idea behind using Node+Express is to leverage the minimalistic approach that Express provides on top of node.js. It does not mandate us to follow any prescribed approach of development. Rather  it lets the developer use the framework as he wishes to. It is a powerful hosting platform that enabled me to seamlessly handle the API calls and server-side view rendering. It was an amazing experience to work with Express! For automatically detecting the changes in the app and restarting the application anytime when such change occurs, we used **nodemon**. It is installed as a local dependency for this project. You can simply start the application using below command.
    > nodemon start
    
    The front end heavily uses **JQuery** for DOM manipulations and async API calls. The UI also uses two very powerful libraries **Tabulator** and **CanvasJS** for table operations and statistical data representaiton respectively. We are using traditional **Bootstrap** for a clean professional dashboard look and feel.
     
2. Back end API logic (Node+NodeRED editor, MongoDB)
    To imitate the usual infrastructure, the back end of the project is hosted on a virtual machine in the **Google Cloud** environment.
    For seamless and rapid API development, I used **NodeRED** flow editor. NodeRED is an amazing tool that allows designing the **NodeJS** apps as easily as connecting few nodes together. It is a very straight forward tool for nodeJS development. I practically built all the APIs in a single day, all because of NodeRED. This helped me to focus on developing core business logic.
    
    ![image](https://user-images.githubusercontent.com/47729974/75133463-e8e46c80-56a8-11ea-83c6-2573ae1e0cf7.png)

    **MongoDB** is as powerful as it gets! It is an amazing NoSQL database that provides fast access to data and countless capabilities to implement real-time data manipulation. Even though the project scope does not include real-time data reflection, it can be implemented as a future scope. I am planning to use **streams + websockets** to implement real-time data update at the client side.


# UI glimpses

![image](https://user-images.githubusercontent.com/47729974/75133931-91df9700-56aa-11ea-871e-4f5a3703625e.png)

![image](https://user-images.githubusercontent.com/47729974/75133981-cf442480-56aa-11ea-86d3-7e6a43918aa5.png)

![image](https://user-images.githubusercontent.com/47729974/75134002-ea169900-56aa-11ea-857f-f3fb2f8ed5c8.png)

![image](https://user-images.githubusercontent.com/47729974/75134018-f995e200-56aa-11ea-86e9-89baf21d7bd0.png)

