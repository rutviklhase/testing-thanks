const core = require('@actions/core')
const github = require('@actions/github')

async function run()
{
    console.log("sanity check");

    try{
        const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
        const octokit = github.getOctokit(GITHUB_TOKEN);

        const { context= {} } = github;
        const { pull_request } = context.payload;

        await octokit.rest.issues.createComment(
            {
                ...context.repo,
                issue_number: pull_request.number,
                body:'Thanks for the PR. We will reiveew it shortly'

            }
        )
    }
    catch(error){
        core.setFailed(error.message);
        
    }
}
run();