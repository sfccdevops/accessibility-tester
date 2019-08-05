![Logo](img/logo.png "Logo")

**[↤ Developer Overview](../README.md)**

Troubleshooting
===

> This document contains a list of known issues, and how to solve them.

<img src="https://octodex.github.com/images/dinotocat.png" width="400" />

`✖ Test Error: Pa11y timed out (30000ms)`
---

The default timeout for testing is 30,000 milliseconds.  If you get this error, that means the URL you are testing took longer to load than the maximum timeout.

You can fix this by increasing the timeout by either adding in a CLI argument like this `--timeout 100000` or adding a `"timeout": 100000` to your config file.  You can adjust this number to be as long as you need.