---
layout: default.html
---

{{ content | safe }}

{% if page.url !== '/expertise/' -%}
    ## Other areas I work with
{%- endif %}
{%- set nav = collections.expertise %}
{%- set label = "Expertise" %}
{% include "nav.html" %}
