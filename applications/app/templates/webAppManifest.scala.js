@import conf.Static

@()(implicit request: RequestHeader)

@if(experiments.ActiveExperiments.isParticipating(experiments.Garnett)) {
    {
        "name":"The Guardian",
        "short_name":"The Guardian",
        "icons":[
        {
            "type": "image/png",
            "sizes": "192x192",
            "src": "@{JavaScript(Static("images/favicons-garnett/roundel-192x192.png"))}"
    },
        {
            "type": "image/png",
            "sizes": "152x152",
            "src": "@{JavaScript(Static("images/favicons-garnett/roundel-152x152.png"))}"
        },
        {
            "type": "image/png",
            "sizes": "114x114",
            "src": "@{JavaScript(Static("images/favicons-garnett/roundel-114x114.png"))}"
        }
    ],
        "theme_color": "#e7edef",
        "background_color": "#121212",
        "start_url": "/uk?INTCMP=webapp",
        "display": "browser",
        "orientation": "portrait",
        "gcm_sender_id":"660236028602",
        "gcm_user_visible_only":true,
        "permissisons" : [
        "gcm"
    ]
    }

} else {
    {
        "name":"The Guardian",
        "short_name":"The Guardian",
        "icons":[
        {
            "type": "image/png",
            "sizes": "192x192",
            "src": "@{JavaScript(Static("images/favicons/roundel-192x192.png"))}"
    },
        {
            "type": "image/png",
            "sizes": "152x152",
            "src": "@{JavaScript(Static("images/favicons/roundel-152x152.png"))}"
        },
        {
            "type": "image/png",
            "sizes": "114x114",
            "src": "@{JavaScript(Static("images/favicons/roundel-114x114.png"))}"
        }
    ],
        "theme_color": "#005689",
        "background_color": "#ffffff",
        "start_url": "/uk?INTCMP=webapp",
        "display": "browser",
        "orientation": "portrait",
        "gcm_sender_id":"660236028602",
        "gcm_user_visible_only":true,
        "permissisons" : [
        "gcm"
    ]
    }

}
