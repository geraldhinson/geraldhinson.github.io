---
layout: page
permalink: /repositories/
title: repositories
description: things I have worked on
nav: true
nav_order: 4
---

{% if site.data.repositories.github_repos %}

<h3>GitHub<h3>

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for repo in site.data.repositories.github_repos %}
    {% include repository/repo.liquid repository=repo %}
  {% endfor %}
</div>
{% endif %}
