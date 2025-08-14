---
layout: default.html
---

{{ content | safe }}

{%- set nav = [
    { title: 'People pleasing, codependency and boundary setting', url: '/expertise/codependency' },
    { title: 'Relationship and attachment difficulties', url: '/expertise/attachment' },
    { title: 'Low self-worth and shame', url: '/expertise/self-worth' }
] %}
{% set label = "Expertise" %}
{% include "nav.html" %}

{% if page.url !== '/expertise/' %}
    [Go to Expertise page](/expertise/).
{% endif %}
