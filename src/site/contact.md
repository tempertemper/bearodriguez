---
title: Contact Bea
description: Get in touch to ask questions or arrange a free initial consultation for in-person or online therapy.
intro: Starting therapy can feel like a big step; reaching out is the first part of that. You're welcome to get in touch to ask questions or arrange a free initial consultation.
illustration: bust.svg
layout: default
permalink: contact.html
---

You can use this form to ask questions or request a free initial consultation. Bea will get back to you as soon as she can.

<form
    name="contact"
    method="post"
    data-netlify="true"
    netlify-honeypot="website"
>
    {# Netlify form name #}
    <input type="hidden" name="form-name" value="contact">

    {# Honeypot field for spam bots #}
    <p hidden>
        <label for="website">Leave this field blank</label>
        <input id="website" name="website" autocomplete="off">
    </p>
    <div>
        <label for="name">Name</label>
        <input
            id="name"
            name="name"
            type="text"
            autocomplete="name"
            required
        >
    </div>
    <div>
        <label for="email">Email address</label>
        <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            required
        >
    </div>
    <div>
        <label for="phone">Telephone number <span>(optional)</span></label>
        <input
            id="phone"
            name="phone"
            type="tel"
            autocomplete="tel"
        >
    </div>
    <div>
        <label for="message">What would you like to talk about</label>
        <textarea
            id="message"
            name="message"
            rows="6"
            required
        ></textarea>
    </div>
    {# <div>
        <label for="hear-about">
            How did you hear about Bea <span>(optional)</span>
        </label>
        <select id="hear-about" name="hear_about">
            <option value="">Please choose an option</option>
            <option value="search">Search engine</option>
            <option value="psychology-today">Psychology Today</option>
            <option value="counselling-directory">Counselling Directory</option>
            <option value="social-media">Social media</option>
            <option value="friend">From a friend or colleague</option>
            <option value="other">Other</option>
        </select>
    </div> #}
    <button type="submit">Send message</button>
</form>
