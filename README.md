# mibreit-photo Homepage Template

## About

Homepage Template based on Gulp and Nunjucks, which makes it easy to create html/php that also include a Wordpress blog.

## Technology

- Gulp -> https://www.npmjs.com/package/gulp
- Nunjucks -> https://www.npmjs.com/package/gulp-nunjucks-render

Head over to [my Youtube channel](https://www.youtube.com/playlist?list=PL_wra5HCV9SlMXNY8PSbht5fbTmAtCccI), where I show exactly how this template was created with a set of videos and which technologies were involved.

## Prerequisites

This project uses a Dev Container to provide the required tools for Web Development. You must have VS Code and the Dev Containers extension installed on your host machine as well as the Docker Engine. On Windows, you can use Docker Desktop, for example. To avoid problems with the mounting of ssh keys, it is recommended, though, to use WSL2 with a Ubuntu distribution and install Docker there.

Here are three video tutorials that will get you started with Docker and Dev Containers:

- [Where Dev Containers are helpful](https://youtu.be/9F-jbT-pHkg?si=yW4RThXZNC0SMIyl)
- [How to create a custom Dev Container](https://youtu.be/7P0pTECkiN8?si=51YPKbUzL7OlAs80)
- [How to configure VS Code Extenstions and Settings in a Dev Container](https://youtu.be/W84R1CxtF0c?si=YBhBRzKk1lgCKEyz)

## Install

1. Clone or download the repository.
2. Open the project folder in VSCode.
3. `CTRL+Shift+P` and enter "Dev Containers: Rebuild and Reopen in Container".
4. Inside the Dev Container run: `npm i`.

## Develop

Make changes to page-data.json, custom variant and pages. To build the project, type ``b + ENTER`` in the terminal of VSCode.

**Important:** You should not touch the base variant, since this is where I make regular updates and where I add features that you can reuse in the custom variant or in your own variants.

**Note:** You can create additional variants, other than custom. Just create another variant folder and add a config.json. If you want to build a specific variant, you can run _gulp --variant [folder of the variant]_. 

## How to use the template

I have two videos in which I show exactly how to use this template:

- Foundation: https://youtu.be/2_eGEfvDUG0
- Customization: https://youtu.be/DWeD49fKobM

## Collaborate

Although I'm a software developer and a quick learner, there are certainly things that can be improved with this template. So if you have suggestions, feel free to [contact me](https://www.mibreit-photo.com/contact.html?subject=Homepage%20Template%20Github) - maybe we can collaborate to improve the template. One topic where I would really need some feedback, for example, is SEO. I'm sure there are some tweaks I can make to further improve the template.
