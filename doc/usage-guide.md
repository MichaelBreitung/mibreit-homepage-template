# Homepage Template Usage Guide

The [Homepage Template](https://github.com/MichaelBreitung/mibreit-homepage-template) provides a solid foundation for your homepage. It includes everything you need to create basic pages for your website, a contact form, a gallery, a blog, and, with an extension, even a shop. 

This guide shows you how to add content to the relatively empty shell you get with the template. It also covers the basics of customizing the look and feel of the homepage you create based on the template. Throughout this guide you'll acquire the basic web development knowledge needed to become the administrator of your own homepage.

[TOC]

## Software

To follow this guide you must install the following software. It is required for accomplishing all the administrative tasks surrounding your website. All the tools are open source and free to use. At the end of this section, you'll find a video in which I show the basics of using the tools together with the Homepage Template.

### Visual Studio Code

Visual Studio Code - short VSCode - is the main user interface through which you make changes to your homepage. It provides a browser, an editing window, and plugins that make creating content easy. 

#### Installation

Download VSCode from [here](https://code.visualstudio.com/download) and install it.

### Node.js

The Homepage Template comes with a build system that requires Node.js to operate. You can check if it's already installed on your system by running ``node -v`` in the terminal / command prompt. If it's not installed, install it.

#### Installation Windows

Download the latest Node.js version from [here](https://nodejs.org/en/download/current) and install it.

#### Installation macOS

On macOS, you should not download a Node.js package via the official homepage. Instead, use [Homebrew](https://brew.sh/) to first install NVM (Node Version Manager), and then install Node.js using NVM. 

1. Open a terminal / shell.

2. Type ``brew help`` - If you get an output about how to use _brew_, it is already installed on your system and you can continue with step 4.

3. Install Homebrew as described [here](https://brew.sh/).

4. Install NVM by calling:
   ````
   $ brew update
   
   $ brew install nvm
   
   $ mkdir ~/.nvm
   
   # On macOS Catalina or later use ~/.zshrc instead of ~/.bash_profile
   $ vim ~/.bash_profile 
   
   # Navigate to the end of the file and add the following two lines
   $ export NVM_DIR=~/.nvm
   $ source $(brew --prefix nvm)/nvm.sh
   ````

5. Press ESC and type ``:wq``. Then hit ENTER to save the file.

6. Type ``source ~/.bash_profile``to reload. Use  ``source ~/.zshrc`` on macOS Catalina or later.

7. Install Node.js by calling ``nvm install 16``. We install an older version of Node.js here for compatibility. It should also work on older macOS systems.

### Git

Git is a version management system. In the [Appendix](#Version-Control) I show how to use it that way, to create a version history for your homepage. But even if you don't need a version history, Git is required for the steps in the [Preparation](#Preparation) section to work.

#### Installation Windows

Dowanload and install _git-scm_ from [here](https://git-scm.com/downloads).

#### Installation macOS

On macOS, I recommend to again use Homebrew for the installation:

1. Open a terminal / shell.
2. Type ``brew help`` - If you get an output about how to use _brew_, it is already installed on your system and you can continue with step 4.
3. Install Homebrew as described [here](https://brew.sh/).
4. Install Git by calling ``brew install git``.

### Laragon

One of the most important things when it comes to web development is to test your changes before you publish them. For this, you will use Laragon, which allows you to locally host your homepage for testing. 

#### Installation

Download the full version of Laragon from [here](https://laragon.org/download/) and install it.

#### macOS Alternative

You get similar functionality on Mac by using [XAMPP](https://alternativeto.net/software/xampp/about/).

### WinSCP

To publish your website, you will use WinSCP.

#### Installation

Download WinSCP from [here](https://winscp.net/eng/download.php) and install it.

#### macOS Alternative

You get similar functionality on Mac by using [FileZilla](https://filezilla-project.org/download.php?show_all=1).

## Preparation

Before you can start adding content to your homepage, you must prepare the Homepage Template:

1. Open VSCode.
2. Under _File - Open Folder..._ open the directory containing your homepage.
3. Open the terminal under _View - Terminal_, if it is not already showing up.
4. In the terminal, type ``npm install ``.
5. After the previous command has finished executing, run ``npm install -g gulp-cli``.

This will install additional dependencies and tools in the _node_modules_ folder of your homepage project. You can ignore this folder afterward.

![usage-guide-preparation](C:\mibreit-photo\Homepage\homepage-template\doc\images\usage-guide\usage-guide-preparation.jpg)

## Build

Inside your homepage directory, you'll notice a _src_ folder. The source of the Homepage Template is contained inside of it together with the content of your homepage. We will cover the _src_ folder in more detail later. Just know that to publish your homepage, you must first build it. It means that the sources contained in the _src_ folder are compiled into files you can directly host on your web server or test with Laragon. The compiled files will appear in the _dist_ folder after your first build.

To build your homepage, run ``gulp`` in the terminal of VSCode. It is the most important command you must remember. You must use it every time you want to publish new content to your web server.

## Content Overview

In this section, I give you an overview of the Homepage Template. I'll explain the folder structure, the purpose of the different files, and where you will add your content.

![usage-guide-content-overview](C:\mibreit-photo\Homepage\homepage-template\doc\images\usage-guide\usage-guide-content-overview.jpg)

From top to bottom, you find the following folders:

- **dist** - As already explained, this folder will appear after you build the homepage for the first time. It contains all the files you publish to your web server.
- **node_modules** - This folder will appear after you execute ``npm install``. It contains a set of dependencies required to build your homepage.
- **scripts** - Contained are the scripts that are executed during build by running the ``gulp`` command.
- **src** - This folder contains the content, the structure, the design, and the functionality of your homepage.
  - **htaccess** - It contains the configuration for your web server. You should not touch the contained file.
  - **pages** - **Here you find the structure and the content of your homepage. Here, you will make most of the changes.** The Homepage Template comes with a set of example pages you can study to get an idea how to add your own pages.
  - **plugins** - The Homepage Template comes with a set of scripts that provide features like a slideshow, a gallery, and a contact form among others. You should not make changes to the content of this folder.
  - **scripts** - Basic functionality like the cookie consent form, the navbar, and lazy loading are contained here. You should not make changes to the content of this folder.
  - **temp** - This folder should typically not be visible in the structure. Only if the build fails for some reason, it might remain in the folder structure after running the build. You can delete it in that case.
  - **variant-base** - It contains the homepage templates that define the structure of the HTML and PHP code. You should not make changes to the content of this folder.
  - **variant-custom** - This is where you can customize the look of your web site. You find an example on how to do this in the [Appendix - Customizing CSS](#Customizing-CSS) section

In addition to the mentioned folders, you'll also find some important files:

- **.gitignore** - This file is important, if you want to put your code under [version control](#Version-Control). Don't touch it.
- **.prettierrc** - Contains formatting information for the [Prettier Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode). You can ignore it.
- **gulpfile.js** - The build script that is executed when you call ``gulp``. Don't touch it.
- **LICENSE** - Information about the open source license under which the Homepage Template may be used.
- **package-lock.json** - Automatically generated and updated when running ``npm install``. In contains detailed information about the installed dependencies in the _node_modules_ folder.
- **package.json** - Information about the version, dependencies, and scripts of the Homepage Template. Don't touch it.
- **README.md** - Quick overview of the Homepage Template and how to build, adapt, and use it.

## Content

This section is about how to add different types of content to your homepage.

## Appendix

### Customizing CSS

### Version Control

### Local WordPress Testing

## Glossary

- **Build** - Refers to the process of compiling the source files of your homepage - contained in _src_ folder.
- **HTML** - HTML is the standard markup language of the web. Static homepages use it to structure their content. 
- **PHP** - If the static content that HTML provides is not sufficient to present content, PHP can be used to dynamically create the markup that is sent to the users browser on the server. The Homepage Template uses PHP, for example, to create the galleries. WordPress is also based on PHP.
- **Web Server** - Your web hosting provider will have several servers running in the cloud / internet. You will host your website on such a server so it can be accessed by other people browsing the internet. For this, your provider will supply you with login and upload information. 

## References

- [Node.js Installation on macOS](https://tecadmin.net/install-nvm-macos-with-homebrew/)
- [PhpMyAdmin Installation  for Laragon](https://dev.to/dendihandian/adding-phpmyadmin-to-laragon-lite-j96)