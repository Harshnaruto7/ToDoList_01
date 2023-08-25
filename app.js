const express = require("express");



const mongoose = require("mongoose");

const _ = require("lodash");


const app = express();



app.use(express.urlencoded());


app.set('view engine', 'ejs');


app.use(express.static("public"));


const uri = "mongodb+srv://Harsh:cat665dog@cluster0.gfhuqsx.mongodb.net/toDoList"



mongoose.connect(uri);


const itemSchema = new mongoose.Schema({

    name: String,


})


const Item = mongoose.model("Item", itemSchema);



const item1 = new Item({
    name: "Welcome to your todoList!"
});


const item2 = new Item({

    name: "Hit the + button to aff a new item."

})




const item3 = new Item({

    name: "<-- Hit this to delete an item."

})


const defaultItems = [item1, item2, item3];




const listSchema = {

    name: String,
    items: [itemSchema],

}


const List = mongoose.model("List", listSchema);



app.get("/", function (req, res) {


    Item.find({}).then(function (foundItems) {



        if (foundItems.length === 0) {


            Item.insertMany(defaultItems)
                .then(function () {
                    console.log("Successfully saved default items to DB");


                })

                .catch(function (err) {
                    console.log(err);
                });

            res.redirect("/");


        }



        else {
            res.render("list", { listTitle: "Today", newListItems: foundItems });

        }



    })
        .catch(function (err) {
            console.log(err);
        });



})



app.post("/", function (req, res) {



    const itemNames = req.body.newItem;

    const listName = req.body.list;

    const item = new Item({

        name: itemNames,

    })


    if (listName === "Today") {
        item.save().then(function () {
            res.redirect("/");

        })
            .catch(function (err) {
                console.log(err);
            });



    }
    else {
        List.findOne({ name: listName })
            .then(function (foundList) {

                foundList.items.push(item);
                foundList.save();
                res.redirect("/" + listName);


            });

    }


});



app.get("/:customListName", function (req, res) {



    const customListName = _.capitalize(req.params.customListName);


    if (customListName === "Today") {
        res.redirect("/");
    }
    else {







        List.findOne({ name: customListName })
            .then(function (foundList) {


                if (!foundList) {

                    const list = new List({

                        name: customListName,
                        items: defaultItems,

                    });



                    console.log("Create a new List.")



                    list.save();
                    res.redirect("/" + customListName);
                }

                else {

                    console.log("Exists!");

                    res.render("list", { listTitle: foundList.name, newListItems: foundList.items })



                }
            })

            .catch(function (err) {
                console.log(err);
            })

    }

});



app.post("/delete", function (req, res) {


    const checkedItemId = req.body.checkbox;

    const listName = req.body.listName;

    console.log(listName);

    if (listName === "Today") {

        Item.findByIdAndRemove(checkedItemId)
            .then(function () {

                console.log("Successfully deleted the item.");

                res.redirect("/");

            })
            .catch(function (err) {

                console.log(err);


            });
    }
    else {



        List.findOneAndUpdate({ name: listName },
            { $pull: { items: { _id: checkedItemId } } })

            .then(function () {

                console.log("Successfully deleted item.")
                res.redirect("/" + listName);


            })
            .catch(function (err) {
                console.log(err);

            })





    }


})


app.listen(4000, function () {
    console.log("The server is running on the port 4000 ")
})



















