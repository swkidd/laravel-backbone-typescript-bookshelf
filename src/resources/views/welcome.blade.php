<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Books!</title>

    <link rel="stylesheet" href="{{ asset('css/bootstrap.css') }}">
    <script>
        /*to prevent Firefox FOUC, this must be here*/
        let FF_FOUC_FIX;
    </script>
    <script src="/js/manifest.js"></script>
    <script src="/js/vendor.js"></script>
    <script src="/js/app.js"></script>
</head>

<body>
    <div id="container"></div>
    <script type="text/javascript">
        var User = Backbone.Collection.extend({
            url: '/user',
        });
        var UserView = Backbone.View.extend({
            el: '#container',

            initialize: function() {
                this.render();
            },

            render: function() {
                (new User()).fetch({
                    success: function(collection, response, options) {
                        collection.forEach(user => {
                            $("#container").html(user.attributes.name)
                        })
                    }
                })
            }
        });
        window.x = new UserView();
    </script>
</body>

</html>
