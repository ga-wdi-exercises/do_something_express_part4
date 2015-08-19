# Do Something Part 3

For tonight's homework, you'll be replacing the hard-coded List and Task objects
with Sequelize models.

To begin, take a look at how things are organized in the starter code on this master branch.

Then:

- Create a `config/connection.js` file which connects to the DB.
- Create Sequelize models for both Lists and Tasks.
- Update the rest of your application to reference these models.

By the end, you should be able to use Postman, Cocoa, or plain old AJAX to perform all CRUD functions on both Lists and Tasks.

Your app should have the following routes:

```
get /lists
post /lists
get /lists/:id
put /lists/:id
delete /lists/:id
get /tasks
get /tasks/:id
put /tasks/:id
delete /tasks/:id
get /lists/:listId/tasks
post /lists/:listId/tasks
```

Don't worry about views for now!
