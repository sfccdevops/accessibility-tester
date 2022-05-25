![Logo](img/logo.png "Logo")

**[↤ Developer Overview](../README.md#developer-overview)**

Actions
-------

Actions are additional interactions that you can perform before the tests are run. They allow you to do things like click on a button, enter a value in a form, wait for a redirect, or wait for the URL fragment to change.

Here is an example of a `config` file containing a set of actions to test on a clients site.

Example: `/path/to/config.json`

```json
{
  "format": "html",
  "compress": true,
  "notices": false,
  "warnings": false,
  "output": "/Users/sfcc/Desktop/report-sample",
  "open": true,
  "screenCapture": true,
  "timeout": 100000,
  "wait": 500,
  "auth": {
    "token": "YXNkOmFzZGFzZA=="
  },
  "tests": [
    {
      "url": "https://mywebsite.com",
      "actions": [
        "click element #tab-1",
        "wait for element #tab-1-content to be visible",
        "set field #fullname to John Doe",
        "check field #terms-and-conditions",
        "uncheck field #subscribe-to-marketing",
        "screen capture example.png",
        "wait for fragment to be #page-2",
        "wait for path to not be /login",
        "wait for url to be https://example.com/",
        "wait for #my-image to emit load",
        "navigate to https://another-example.com/"
      ]
    }
  ]
}
```

Here's another example using CLI `action` parameter:

```bash
sfcc-a11y https://mywebsite.com --actions='set field #username to my@email.com' 'set field #password to abc123' 'click element #submit'
sfcc-a11y https://mywebsite.com -a 'set field #username to my@email.com' 'set field #password to abc123' 'click element #submit'
```

Below is a reference of all the available actions and what they do on the page. Some of these take time to complete so you may need to increase the `timeout` option if you have a large set of actions.

### Click Element

This allows you to click an element by passing in a CSS selector. This action takes the form `click element <selector>`. E.g.

```json
"actions": [
    "click element #tab-1"
]
```
You can use any valid [query selector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector), including classes and types.

### Set Field Value

This allows you to set the value of a text-based input or select box by passing in a CSS selector and value. This action takes the form `set field <selector> to <value>`. E.g.

```json
"actions": [
    "set field #fullname to John Doe"
]
```

### Check/Uncheck Field

This allows you to check or uncheck checkbox and radio inputs by passing in a CSS selector. This action takes the form `check field <selector>` or `uncheck field <selector>`. E.g.

```json
"actions": [
    "check field #terms-and-conditions",
    "uncheck field #subscribe-to-marketing"
]
```

### Screen Capture

This allows you to capture the screen between other actions, useful to verify that the page looks as you expect before the test runs. This action takes the form `screen capture <file-path>`. E.g.

```json
"actions": [
    "screen capture example.png"
]
```

### Wait For Fragment/Path/URL

This allows you to pause the test until a condition is met, and the page has either a given fragment, path, or URL. This will wait until the test times out so it should be used after another action that would trigger the change in state. You can also wait until the page does **not** have a given fragment, path, or URL using the `to not be` syntax. This action takes one of the forms:

  - `wait for fragment to be <fragment>` (including the preceding `#`)
  - `wait for fragment to not be <fragment>` (including the preceding `#`)
  - `wait for path to be <path>` (including the preceding `/`)
  - `wait for path to not be <path>` (including the preceding `/`)
  - `wait for url to be <url>`
  - `wait for url to not be <url>`

E.g.

```json
"actions": [
    "click element #login-link",
    "wait for path to be /login"
]
```

### Wait For Element State

This allows you to pause the test until an element on the page (matching a CSS selector) is either added, removed, visible, or hidden. This will wait until the test times out so it should be used after another action that would trigger the change in state. This action takes one of the forms:

  - `wait for element <selector> to be added`
  - `wait for element <selector> to be removed`
  - `wait for element <selector> to be visible`
  - `wait for element <selector> to be hidden`

E.g.

```json
"actions": [
    "click element #tab-2",
    "wait for element #tab-1 to be hidden"
]
```

### Wait For Element Event

This allows you to pause the test until an element on the page (matching a CSS selector) emits an event. This will wait until the test times out so it should be used after another action that would trigger the event. This action takes the form `wait for element <selector> to emit <event-type>`. E.g.

```json
"actions": [
    "click element #tab-2",
    "wait for element #tab-panel-to to emit content-loaded"
]
```

### Navigate To URL

This action allows you to navigate to a new URL if, for example, the URL is inaccessible using other methods. This action takes the form `navigate to <url>`. E.g.

```json
"actions": [
    "navigate to http://another-example.com"
]
```
