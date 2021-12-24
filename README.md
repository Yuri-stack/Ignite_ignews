<h1 align="center">
	<img src="public/images/logo.svg"  alt="Logo" width="240"><br><br>
   Ig.News
</h1>

<div>
    <p align="center">
    <a href="https://www.linkedin.com/in/yuri-silva99/" target="_blank">
        <img src="https://img.shields.io/static/v1?label=Author&message=Yuri&color=00ba6d&style=for-the-badge&logo=LinkedIn" alt="Author: Yuri">
    </a>
    <a>
    <img src="https://img.shields.io/static/v1?label=Language&message=React&color=aquamarine&style=for-the-badge&logo=React" alt="Language: React">
</a>
    <a>
        <img src="https://img.shields.io/static/v1?label=Language&message=Typescript&color=blue&style=for-the-badge&logo=Typescript" alt="Language: Typescript">
    </a>
  <br>
    <a>
        <img src="https://img.shields.io/static/v1?label=Language&message=SASS&color=ff69b4&style=for-the-badge&logo=SASS" alt="Language: SASS">
    </a>
      <a>
    <img src="https://img.shields.io/static/v1?label=Database&message=FaunaDB&color=blueviolet&style=for-the-badge&logo=database" alt="Database: FaunaDB">
</a>
<a>
    <img src="https://img.shields.io/static/v1?label=CMS&message=Prismic&color=blue&style=for-the-badge&logo=Prismic" alt="CMS: Prismic">
</a>
<a>
    <img src="https://img.shields.io/static/v1?label=Build&message=NextJs&color=black&style=for-the-badge&logo=nextdotjs" alt="NextJs: NextJs">
</a>
    </p>
</div>

## Table of Contents

<p align="center">
 <a href="#about">About</a> •
 <a href="#features">Features</a> •
 <a href="#revised-concepts">Revised Concepts</a> • 
 <a href="#installation">Installation</a> • 
 <a href="#getting-started">Get Started</a> • 
 <a href="#technologies">Technologies</a> • 
 <a href="#license">License</a>
</p>

## 📌About

<div>
    <p align="center">
    <em>
    Building a Newsletter Subscription Platform on ReactJs content
    </em>
    </p>
</div>

## 🚀Features

- Connecting to Github via OAuth
- Signature System with Stripe
- Information control with the Fauna Database
- Post Preview Screen

## 👓Revised Concepts

- Control of Logged Users and Subscribers
- Concept of SSG and SSR with Next
- Next Auth
- Dynamic routes
- Webhooks
- Use of APIs to control Authentication and Enrollment
- Front-End JAMStack and connection to CMS Prismic

## 📕Installation

**You must have already installed**
- [Node.js](https://nodejs.org/en/)
- [Npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

**Recommendations**
-   It is recommended that you have installed Google Chrome or Edge
-   I recommend using VSCode as development IDE
-   You will need to have an account on the following platforms to access the required environment variables:
	- Stripe
	- FaunaDB
	- Github
	- Prismic CMS

**Let's divide it into 3 steps.**
1. Clone this repository
2. Install dependencies
3. Setting Environment Variables
4. Installing the Stripe CLI / Executable
  ---
### 1. Clone this repository
```
git clone https://github.com/Yuri-stack/Ignite_ignews.git
```
---
### 2. Install the dependencies
```
npm install
```
or
```
yarn
```

*Make sure your internet is stable, as this may take a while* 

### 3. Setting Environment Variables

In the ``env.local`` file, change its name to ``.env.local``. Once this is done, place the respective personal keys for each platform. If in doubt, please read the documentation for each platform.

### 4. Installing the Stripe CLI / Executable

To test the webhooks Stripe you need access the Stripe documentation, and look for the CLI option. Once that's done, you can be installing the CLI or downloading the Executable. 

- In the case of the first option, follow the Stripe Tool documentation. 

- In the case of the second option, download the .exe, create a folder in the root of the project called ``stripe-cli``, and place the .exe there so that the ``stripe`` script will work.

## 🎮Getting Started

1. Run the project
```
yarn dev
```

2. Run the Stripe CLI (In case, if you choose the second option)
```
yarn stripe
```
3. Now, open your browser and navigate to: http://localhost:3000

## 🌐Technologies

- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/getting-started/example)
- [Stripe](https://stripe.com/br)
- [Prismic CMS](https://prismic.io/)
- [Fauna ](https://fauna.com/)

## 📝License

Released in 2021.

This project is under the MIT license

Made with love by [Yuri Oliveira](https://github.com/Yuri-stack) 🚀.
