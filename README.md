[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/MnOQKepF)


# assignment-5-cicd
This is the (mostly) empty starter repository for assignment 5, in which we practice the fundamentals of CI/CD.

This project is a web application deployed on Netlify. You can access the site [here](https://researchef.netlify.app/).

## Automation

This project uses GitHub Actions for Continuous Integration (CI) and Continuous Deployment (CD). On every push to the main branch, the CI pipeline runs linting and tests to ensure the code quality and functionality. If all tests pass, the CD pipeline automatically deploys the application to Netlify.

We also apply a simple netlfiy function to just print hello as a test use case for this functionality.

## Local Installation

Follow these steps to install and run this project locally:

1. Clone the repository:
   ```
   git clone https://github.com/cscie114/assignment-5-cicd-cre8ture.git
   ```

2. Navigate to the project directory:
   ```
   cd assignment-5-cicd-cre8ture
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Run the application:
   ```
   npm start
   ```
   The application will start running at `http://localhost:3000`.

## Live Application

You can access the live application at [https://researchef.netlify.app/](https://researchef.netlify.app/).

## using Github Actions

You can take a look at `ci.yaml` inside of `.github/workflows`. Here, you will see the steps to do continuation integration to Netlify. You can build the app locally with

## Tutorial on continuous integration using Github Actions

Here's a more detailed description:

1. **Set up a GitHub Actions workflow**: In your repository, create a new file under `.github/workflows` (for example, `ci.yaml`). This file will define your CI workflow. 

2. **Define the workflow triggers**: At the beginning of your workflow file, specify when the workflow should run. Typically, you'd want the workflow to run on every push to your main branch and possibly on pull requests as well. 

    ```yaml
    on:
      push:
        branches:
          - main
      pull_request:
    ```

For Github that would be:
    ```bash 
    github add --all
    github commit -m "your message"
    github push --all
    ```

3. **Define the build job**: In the `jobs` section of your workflow file, define a job that sets up your environment, installs dependencies, and builds your application. 

    ```yaml
    jobs:
      build:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v2
          - uses: actions/setup-node@v2
            with:
              node-version: '<fill in your Node version>'
          - run: npm ci
          - run: npm run build
    ```

4. **Deploy to Netlify**: After building your application, add a step to deploy your application to Netlify using the `nwtgck/actions-netlify` action. 

    ```yaml
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v3.0
      with:
        publish-dir: './public'
        production-branch: main
        github-token: ${{ secrets.GITHUB_TOKEN }}
        enable-commit-comment: true
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
    ```
- Note: 
 - you can also use the more modern approach, to use the netlify CLI tool: 

 ```yaml
       - run: npm ci
      - run: npm install babel-eslint --save-dev
      - run: npm run lint
      - run: npm test
      - name: Install Netlify CLI
        run: npm install netlify-cli -g
      - name: Build site
        run: npm run build
      - name: Deploy to Netlify
        run: netlify deploy --prod --site ${{ secrets.NETLIFY_SITE_ID }} --auth ${{ secrets.NETLIFY_AUTH_TOKEN }} --dir=./public
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
```
5. **Add Netlify secrets to your repository**: In your repository settings, add your Netlify auth token and site ID as secrets. These will be used by the `nwtgck/actions-netlify` action to authenticate with Netlify and deploy your site. [Source](https://github.com/marketplace/actions/netlify-actions)

6. **Push your changes**: Once you've set up your workflow, push your changes to your repository. Your workflow will run automatically on every push to your main branch and deploy your site to Netlify.

Replace the placeholders in the above code snippets with your actual values. For example, replace `'14'` with your actual Node.js version, and replace `'./public'` with your actual build output directory.

## Serverless functions
Serverless functions are functions that live on the cloud and are ready on demand without the heaviness of a backend that you have to manage.

I created two different functions. One using .js and the other .mjs.
They can be reached at either :
[https://researchef.netlify.app/.netlify/functions/hello](https://researchef.netlify.app/.netlify/functions/hello)
[https://researchef.netlify.app/.netlify/functions/hello2](https://researchef.netlify.app/.netlify/functions/hello2)


