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

The Homepage Template comes with a build system that requires Node.js to operate. You can check if it's already installed on your system by running ``node -v`` in the terminal / command prompt. If it's not installed, install it. I recommend to use **Node.js Version 20**. The homepage template was tested with it.

#### Installation Windows

Download the latest Node.js version from [here](https://nodejs.org/en/download/current) and install it.

#### Installation macOS

On macOS, you should not download a Node.js package via the official homepage. Instead, use [Homebrew](https://brew.sh/) to first install NVM (Node Version Manager), and then install Node.js using NVM. 

1. Open a terminal / shell.

2. Type ``node --version``. If this command returns a Node.js version, you don't have to continue with the installation.

3. Type ``brew help`` - If you get an output about how to use _brew_, it is already installed on your system and you can continue with step 4.

4. Install Homebrew as described [here](https://brew.sh/).

5. Install NVM by calling:
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

6. Press ESC and type ``:wq``. Then hit ENTER to save the file.

7. Type ``source ~/.bash_profile``to reload. Use  ``source ~/.zshrc`` on macOS Catalina or later.

8. Install Node.js by calling ``nvm install 20``. We install version 20 of Node.js here as it is the version with which the Homepage Template was tested. If you have an older macOS system, you might have to use an older version of Node.js. You can try version 16 for example.

### Git

Git is a version management system. In the [Appendix](#Version-Control) I show how to use it to create a version history for your homepage. Even if you don't need a version history, Git is required for the steps in the [Preparation](#Preparation) section to work.

#### Installation Windows

Download and install _git-scm_ from [here](https://git-scm.com/downloads).

#### Installation macOS

On macOS, I recommend to again use Homebrew for the installation:

1. Open a terminal / shell.
2. Type ``git --version``. If this command returns a Git version, then Git is already installed and you don't have to continue here.
3. Type ``brew help`` - If you get an output about how to use _brew_, it is already installed on your system and you can continue with step 4.
4. Install Homebrew as described [here](https://brew.sh/).
5. Install Git by calling ``brew install git``.

### Python

Python is a very popular programming language and you will use it to manage your galleries.

#### Installation Windows

Download and install Python from [here](https://www.python.org/downloads/). Use the latest stable version.

#### Installation macOS

On macOS, I recommend to use the official installer. But first, check if Python is already installed on your system:

1. Open a terminal / shell.
2. Type ``python --version``. If this command returns a Python version larger than 3, you don't have to continue with the installation.
3. Get the official installer from [here](https://www.python.org/downloads/macos/): 
   - Use the latest stable version. 
   - After selecting the latest stable version, scroll to the end of the page that is opened. You will find a list of installers. Download the one that starts with "macOS".
4. Run the installer and follow the instructions.

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

You get similar functionality on macOS by using [FileZilla](https://filezilla-project.org/download.php?show_all=1).

## Preparation

Before you can start adding content to your homepage, you must prepare the Homepage Template:

1. Open VSCode.

2. Under _File - Open Folder..._ open the directory containing your homepage.

3. Open the terminal under _View - Terminal_, if it is not already showing up.

   - Under windows, I recommend you switch the terminal to the Git Bash by pressing the + Icon on the right side and selecting "Git Bash" from the dropdown.

   ![Git-Bash-VS-Code](C:\mibreit-photo\Homepage\homepage-template\doc\images\usage-guide\Git-Bash-VS-Code.jpg)

4. In the terminal, type ``npm install ``.

5. After the previous command has finished executing, run ``npm install -g gulp-cli``.

This will install additional dependencies and tools in the _node_modules_ folder of your homepage project. You can ignore this folder afterward.

![usage-guide-preparation](C:\mibreit-photo\Homepage\homepage-template\doc\images\usage-guide\usage-guide-preparation.jpg)

## Build

Inside your homepage directory, you'll notice a _src_ folder. The source of the Homepage Template is contained inside of it together with the content of your homepage. We will cover the _src_ folder in more detail later. Just know that to publish your homepage, you must first build it. It means that the sources contained in the _src_ folder are compiled into files you can directly host on your web server or test with Laragon. The compiled files will appear in the _dist_ folder after your first build.

**To build your homepage, run ``gulp`` in the terminal of VSCode**. It is the most important command you must remember. You must use it every time you want to publish new content to your web server.

## Test

To test your homepage, use [Laragon](#Laragon). Open it and select the the **dist** folder as _Document Root_, after opening the _Preferences_.

![Laragon-Preferences](C:\mibreit-photo\Homepage\homepage-template\doc\images\usage-guide\Laragon-Preferences.jpg)

Afterward, press _Start All_. In your browser of choice, enter ``http://localhost`` in the address bar. Your locally built homepage will open. Navigate through the different pages and check the content.

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

This section is about how to add different types of content to your homepage. If you used my web development service to prepare the template for you, the structure will already be ready with all the pages. You just have to add the content. If you start from scratch, the contained sample pages will give you a guide on how to add content.

### Homepage Structure

Inside the _src_ folder, you will find a directory called **pages**. This is where you create the folder structure for your homepage and where you add pages.

#### Rules

- Don't create deep nesting of folders. Try to put your main navigation pages into the root folder of _pages_. Use separate folders for the galleries / portfolio, the blog, services, and similar clusters of pages. Inside the galleries, you can add one more set of folders. But don't create any more nesting. This will create too long URLs and might hurt your SERP.
- Stick to lower-case names for folders and files within _pages_. If you have names that consist of two more more words, separate those with a minus "-". Avoid too long names for your pages and folders. The final URL - contains your domain, folders, and page - should not exceed 75 characters. 

### Pages

To create a page inside of **pages**, copy the **page-template.html** file from the _doc_ folder into the target directory under _pages_ and rename it to your desired page title. Run ``gulp`` to build the homepage and navigate to the newly created page as described under [Test](#Test). In it, you will find a guide on how to add content.

### Galleries

Galleries are special pages you can use to display your photos. To create and manage a gallery, you must first initialize the gallery manager once:

1. Run ``git submodule init`` in the terminal, followed by ``git submodule update --remote``.
2. Check that a new **tools** folder with a **mibreit-gallery-manager** folder is present. In the terminal, switch to that new folder by executing ``cd tools/mibreit-gallery-manager/``
3. Install _pillow_ by executing ``pip install pillow``. This tool is used to create small versions of your photos that are used to navigate through the gallery.

#### Creating a New Gallery

For each gallery you want to create, perform the following steps:

1. Create a folder for your gallery inside of **pages/galleries**. Inside this folder you can create the individual gallery folders. For example a gallery for seascape photos, mountain photos, woodland photos, and architecture photos. Or you can create galleries for different countries as I did on [my homepage](https://www.mibreit-photo.com/galleries.html).
2. Copy the **gallery-template.php** file from the _doc_ folder into the newly created gallery directory and rename it to **index.php**.
3. Execute ``npm run gallery:create``. When asked for a gallery name, provide the name of the gallery folder you just created.
4. Execute ``gulp`` to build your homepage.
5. Under **dist/galleries**, you will now find your gallery directory with the **index.php**, an **gallery.xml** file, an **images** folder, and a **small** folder.
9. Open the **gallery.xml** file inside your new gallery. You will find several "TODO" fields. Add appropriate information for your gallery:

   - **keywords** - Provide SEO optimized keywords for the gallery.
   - **description** - Provide a good, SEO optimized description for the gallery.
   - **title** - Provide a SEO optimized title for the gallery.
   - **header_h1** - This header will be used to extend the title and provide some more keywords. It will be initially shown in the gallery, if no image is selected. Once an image is selected, this title will be replaced by the title of the image.
   - **content_category** - This information is not used by the default Homepage Template. You can leave it blank.
   - **content_title** - This information is not used by the default Homepage Template. You can leave it blank. 
   - **content** - This information is not used by the default Homepage Template. You can leave it blank. 

Your new gallery is now created, but still empty. If you open it in the browser, you'll just see a single, empty image that is added as a place holder. To add your own photos, proceed to the next section.

#### Adding Photos to an Existing Gallery

Adding new photos to an existing gallery is easy:

1. Prepare your photos for web and place them inside the **images** folder of your gallery under **dist**. You will find a **replaceme.jpg** file there at first. Give the images proper names for SEO. If your image names consist of multiple words, separate them with "-". Don't use spaces or other special characters. 

2. Delete the **replaceme.jpg** file once you have added your first images.

3. Execute ``npm run gallery:update`` and follow the instructions. This command can be used, whenever you make changes to the gallery by either adding new photos to the **images** folder, or by removing photos from it. The script will ask you, if you want an image removed from the folder or added to the gallery. Then it will ask for a caption / title. Finally, you will be asked to provide a description in English and German. If you only plan to have a gallery in either of those languages, just leave one of the two descriptions blank.

   You will also be asked for the **index** at which the image shall be added. For the first image use **index** **0**. Afterward, you will get a list with the already added photos, and you can select the index before which the new photo will be inserted.

   **Don't interrupt this step. It currently only works, if you go through all photos.**

Once you are finished, you can test your gallery in the browser. The photos should now appear.

## Appendix

### Customizing CSS

### Version Control

### Local WordPress Testing

## Glossary

- **Build** - Refers to the process of compiling the source files of your homepage - contained in _src_ folder.
- **HTML** - HTML is the standard markup language of the web. Static homepages use it to structure their content. 
- **PHP** - If the static content that HTML provides is not sufficient to present content, PHP can be used to dynamically create the markup that is sent to the users browser on the server. The Homepage Template uses PHP, for example, to create the galleries. WordPress is also based on PHP.
- **SEO** - It stand for Search Engine Optimization. If you want your homepage to rank on google, you should take it seriously. Here is a good [free guide on how to apply SEO](https://www.fuelyourphotos.com/seo-for-photographers/) to your homepage.
- **SERP** - Search Engine Page Rank or rankings of your pages on Google.
- **URL** - The full address of a page of your homepage as a visitor would find it in the address bar of his / her browser.
- **Web Server** - Your web hosting provider will have several servers running in the cloud / internet. You will host your website on such a server so it can be accessed by other people browsing the internet. For this, your provider will supply you with login and upload information. 

## References

- [Node.js Installation on macOS](https://tecadmin.net/install-nvm-macos-with-homebrew/)
- [PhpMyAdmin Installation  for Laragon](https://dev.to/dendihandian/adding-phpmyadmin-to-laragon-lite-j96)
- [SEO Guide for Photographers](https://www.fuelyourphotos.com/seo-for-photographers/)