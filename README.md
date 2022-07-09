![Logo](https://sfccdevops.s3.amazonaws.com/logo-128.png "Logo")

Accessibility Tester
---

> Command Line Interface for Automated Accessibility Testing Salesforce Commerce Cloud Websites

![markdown](https://sfcc-a11y.s3.amazonaws.com/markdown.gif?v=1.3.1)

Introduction
---

A CLI tool that tests client websites for Accessibility Issues and generates reports that can be assigned to Developers.

- [X] Support for Continuos Integration Testing
- [X] Save Reports in CSV, HTML, Jira, JSON, Markdown & XML Formats
- [X] Supports Page Automation using Actions
- [X] Supports Testing Websites behind HTTP Authentication
- [X] Reports provide Resource Links for Developers to Learn More about Accessibility

Developer Overview
---

#### Commands

* [`sfcc-a11y`](https://github.com/sfccdevops/accessibility-tester/blob/master/docs/cmd-a11y.md) - Detailed Examples of `sfcc-ally` Usage
* [`sfcc-a11y auth`](https://github.com/sfccdevops/accessibility-tester/blob/master/docs/cmd-auth.md) - Generate HTTP Authentication Tokens
* [`sfcc-a11y help`](https://github.com/sfccdevops/accessibility-tester/blob/master/docs/cmd-help.md) - Get Help when you need it

#### Additional Information

* [Automate with Actions](https://github.com/sfccdevops/accessibility-tester/blob/master/docs/actions.md) - Submit Forms, Click Links & Other Fun Things
* [Troubleshooting](https://github.com/sfccdevops/accessibility-tester/blob/master/docs/troubleshooting.md) - Some of the Known Issues & how to resolve them

Install
---

#### Requirements

- [X] [Node v14+](https://nodejs.org/en/download/)

#### `npm install`

```bash
npm install -g @sfccdevops/sfcc-a11y
sfcc-a11y help
```

#### `git clone`

```bash
cd ~
git clone https://github.com/sfccdevops/accessibility-tester.git
cd accessibility-tester
npm install -g
sfcc-a11y help
```

Report Samples
---

Whether you are running a test on a single site, or needing to batch multiple tests into a single report, we wanted to make our reports as developer friendly as possible.

Since this is a CLI tool, the default output is in a terminal window.

![sample-report](https://sfcc-a11y.s3.amazonaws.com/sample-report/cli.jpg?v=1.0.0)

#### Below are reports generated in our other supported formats.

* [sample-report.csv](https://gist.github.com/manifestinteractive/fab5fc8cceac093cbe9fb5a5c2ad1b96)
* [sample-report.html](https://sfcc-a11y.s3.amazonaws.com/sample-report/a11y_20190804_221047.html)
* [sample-report.jira](https://gist.github.com/manifestinteractive/52a25c431d8280166e005f5c82b5d34e)
* [sample-report.json](https://gist.github.com/manifestinteractive/dbe2909776bd27a1242cc6afbc7d93d9)
* [sample-report.md](https://gist.github.com/manifestinteractive/f2c87d567ff052acc766ce14387e915b)
* [sample-report.xml](https://gist.github.com/manifestinteractive/bca0ee98f455e2cfe67a8d3f1f31b6ad)

_Built using [pa11y](https://github.com/pa11y/pa11y). Customized for Salesforce Commerce Cloud Developers & Clients._

About the Author
---

> [Peter Schmalfeldt](https://peterschmalfeldt.com/) is a Certified Senior Salesforce Commerce Cloud Developer with over 20 years of experience building eCommerce websites, providing everything you need to design, develop & deploy eCommerce applications for Web, Mobile & Desktop platforms.

Disclaimer
---

> The trademarks and product names of Salesforce®, including the mark Salesforce®, are the property of Salesforce.com. SFCC DevOps is not affiliated with Salesforce.com, nor does Salesforce.com sponsor or endorse the SFCC DevOps products or website. The use of the Salesforce® trademark on this project does not indicate an endorsement, recommendation, or business relationship between Salesforce.com and SFCC DevOps.
