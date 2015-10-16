/* This helper is copied from https://github.com/yogiben/meteor-admin/blob/master/lib/client/js/helpers.coffee.
 I used this to remove the (irrelevant) Meteor.users collection from the dashboard and sidebar (the routes still exist).
 TODO: Maybe a future version of yogiben:admin could allow this without monkey-patching?
 */
UI.registerHelper("admin_collections", function() {
    var collections = {};
    if (typeof AdminConfig !== 'undefined' && typeof AdminConfig.collections === 'object')
        collections = AdminConfig.collections;
    // remove Meteor.users collection (see above)
    delete collections.Users;
    return _.map(collections, function(obj, key) {
        obj = _.extend(obj, { name: key });
        obj = _.defaults(obj, { label: key, icon: 'plus', color: 'blue' });
        return obj = _.extend(obj, {
            viewPath: Router.path("adminDashboard" + key + "View"),
            newPath: Router.path("adminDashboard" + key + "New")
        });
    });
});