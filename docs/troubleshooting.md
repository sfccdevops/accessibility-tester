![Logo](https://sfccdevops.s3.amazonaws.com/logo-128.png "Logo")

**[↤ Developer Overview](../README.md)**

Troubleshooting
===

> This document contains a list of known issues, and how to solve them.

<img src="https://octodex.github.com/images/dinotocat.png" width="400" />

`How do I use the Jira Report?`
---

1. The `format` of `jira` will generate a `.txt` report.
2. Make sure you are not using the New View, as it does not currently support Text Based Formatting.  If you are using the New View, click the "See the old view" at the top of the Jira Ticket to use the version of Jira that will allow you to paste in formatted text, as well as preview that text.
3. Upload any Screen Captures generated as attachments to the ticket before pasting in the formatted text.
4. Copy the contents from the `.txt` file for use as a comment on an existing ticket, or as the description of a new one.
5. All Done :)

`✖ Test Error: Pa11y timed out (30000ms)`
---

The default timeout for testing is 30,000 milliseconds.  If you get this error, that means the URL you are testing took longer to load than the maximum timeout.

You can fix this by increasing the timeout by either adding in a CLI argument like this `--timeout 100000` or adding a `"timeout": 100000` to your config file.  You can adjust this number to be as long as you need.
