![Logo](https://sfccdevops.s3.amazonaws.com/logo-128.png "Logo")

**[↤ Developer Overview](../README.md#developer-overview)**

`sfcc-a11y`
---

> Examples of how to use our CLI tool

![markdown](https://sfcc-a11y.s3.amazonaws.com/markdown.gif?v=1.3.1)


Options:
---

Name           | JSON Param      | CLI Param & Alias        | Default   | Definition
---------------|-----------------|--------------------------|-----------|----------------------------------------------
Actions        | `actions`       | `--actions`, `-a`        | `[]`      | Test Actions ( [Learn More](actions.md) )
Compress       | `compress`      | `--compress`, `-C`       | `false`   | Compress Report ( Only works on HTML Format )
Config         |                 | `--config`, `-c`         |           | Absolute Path to Configuration File
Format         | `format`        | `--format`, `-f`         | `cli`     | Output Format of Report [ `cli`, `csv`, `html`, `jira`, `json`, `md`, `xml` ]
Ignore         | `ignore`        | `--ignore`, `-i`         |  `[]`     | Error Codes to Ignore ( `WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail` )
Notices        | `notices`       | `--notices`, `-n`        | `true`    | Include Notices in Report ( `--notices=false` or `--no-notices` to disable )
Open           | `open`          | `--open`, `-O`           | `false`   | Open Report after Creation ( disabled if using `--compress` )
Output         | `output`        | `--output`, `-o`         |           | Absolute Path to Output Directory for Report ( `cwd` if not provided )
Run in Browser | `runInBrowser`  | `--run-in-browser`, `-b` | `false`   | Run Tests in Browser ( helpful for tests that require sessions / authentication )
Screen Capture | `screenCapture` | `--screen-capture`, `-S` | `false`   | Whether to add a Screen Capture for Report
Standard       | `standard`      | `--standard`, `-s`       | `WCAG2AA` | Accessibility Standard [ `Section508`, `WCAG2A`, `WCAG2AA`, `WCAG2AAA` ]
Timeout        | `timeout`       | `--timeout`, `-t`        | `30000`   | Test Timeout in Milliseconds
Viewport       | `viewport`      | `--viewport`, `-V`       | `desktop` | Viewport Screen Size [ `desktop`, `tablet-landscape`, `tablet-portrait`, `mobile` ]
Wait           | `wait`          | `--wait`, `-W`           | `0`       | Page Load Wait in Milliseconds
Warnings       | `warnings`      | `--warnings`, `-w`       | `true`    | Include Warnings in Report ( `--warnings=false` or `--no-warnings` to disable )


Examples using CLI Params:
---

Test a Website and Output Report to Terminal Window:

```bash
sfcc-a11y https://mywebsite.com
```

Test more than once website at a time:

```bash
sfcc-a11y https://mywebsite.com https://myotherwebsite.com
```

Output Report with Screen Capture as Markdown and Open Report:

```bash
sfcc-a11y https://mywebsite.com --format=md --output=/path/to/folder --screen-capture --open
sfcc-a11y https://mywebsite.com -f md -o /path/to/folder -S -O
```

Run report without Notices or Warnings:

```bash
sfcc-a11y https://mywebsite.com --no-notices --no-warnings
sfcc-a11y https://mywebsite.com -n false -w false
```

Wait for Report until 500 milliseconds has passed:

```bash
sfcc-a11y https://mywebsite.com --wait=500
sfcc-a11y https://mywebsite.com -W 500
```

Prevent Timeout Warning by extending timeout:

```bash
sfcc-a11y https://mywebsite.com --timeout=100000
sfcc-a11y https://mywebsite.com -t 100000
```

Add Test Actions: ( [Learn More about Actions](actions.md) )

```bash
sfcc-a11y https://mywebsite.com --actions='set field #username to my@email.com' 'set field #password to abc123' 'click element #submit'
sfcc-a11y https://mywebsite.com -a 'set field #username to my@email.com' 'set field #password to abc123' 'click element #submit'
```


Examples using Config File:
---

Here is an example of a `config` file containing all of the possible parameters you could use.

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
  "standard": "WCAG2AA",
  "timeout": 30000,
  "wait": 0,
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
      ],
      "ignore": [
        "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail"
      ],
      "timeout": 100000,
      "wait": 500
    }
  ]
}
```

#### Overwriting Config Options per Test

You can set test options one of two ways.  If you have the same options for all your tests, you can set the config option on the root level and it will be applied to all tests.

If you want to set a config option on a specific test, or overwrite your default config options for a specific test, then you can add the config option on the test level ( see `timeout` & `wait` above for examples )


#### Using Config file via CLI

Once you have the config files saved, you can trigger the test via CLI like this:

```bash
sfcc-a11y --config=/path/to/config.json
sfcc-a11y -c /path/to/config.json
```

#### Overwriting Config Options via CLI

It's possible to overload settings in your `config` file by passing in CLI params:

```bash
sfcc-a11y --config=/path/to/config.json --output=/path/to/other/folder
sfcc-a11y -c /path/to/config.json -o /path/to/other/folder
```


Viewport Screen Sizes:
---

Size               | Width | Height
-------------------|-------|---------
`desktop`          | 1366  | 768
`tablet-landscape` | 1024  | 768
`tablet-portrait`  | 768   | 1024
`mobile`           | 360   | 640
