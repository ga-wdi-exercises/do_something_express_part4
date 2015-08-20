# Do Something Part 4

For tonight's homework, add AJAX to your front-end to handle requests. That is: try to convert
this application to a single-page application.

The **only** file you **need** to do anything with is `app/assets/javascripts/application.js`. The HTML, CSS, and everything else has been provided for you.

Remember:

```
dropdb do_something
createdb do_something
npm install
node config/migrate.js
node config/seeds.js
nodemon index.js
```

## Option A

The provided solution is vaguely-object-oriented "jQuery soup". You can see that it's not very DRY: this line shows up 5 times:

```
var id = $(this).siblings("[name=id]").val();
```

Take that code from the solution and refactor it to make it more object-oriented.

## Option B

Work on the goal below. Once you've completed it, see how many of the bonuses below you can reach, going in order (or not). Take any approach you want to write the Javascript -- jQuery soup is allowed!

### Goal:

Write some AJAX that gets the data for all the lists from the database and puts it in the `<main>` element of `index.html`.

Hint:

```
$.ajax({
  url: "/lists",
  method: "get"
}).then(function(response){
  $("main").html(response);
});
```

### Bonus 1:

Make a view that shows all of the lists (using front-end Javascript, not Handlebars).

### Bonus 2:

Add "Delete" functionality to the lists such that when a user clicks a "delete" button, the app will...
- ...submit a `delete` request to remove a list
- ...hide that element if the AJAX request responds successfully.

### Bonus 3:

Show the tasks. Bonus points if you show them with the appropriate list!

### Bonus 4:

Add "Delete" functionality to the tasks.

### Bonus 5:

Add the other CRUD actions (C and U) to both models.

### Bonus 6:

Use `history.pushState` or `window.location.hash` to update the URL to reflect the "state of the application".
