const core = require('@actions/core');
const { Octokit } = require('@octokit/action');
const { context } = require('@actions/github');

async function run() {
  try {
    // Get the threshold value
    const threshold = Number(core.getInput('threshold'));

    // Get the pull request number
    const prNumber = context.payload.pull_request?.number;

    // Get the number of file changes
    const octokit = new Octokit();
    const { data: files } = await octokit.pulls.listFiles({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: prNumber,
    });

    // Check if the number of file changes is greater than the threshold
    if (files.length > threshold) {
      // Comment on the pull request
      const comment = `# The number of file changes exceeds the threshold
      Expected number of file changes : ${threshold}
      Actual number of file changes : ${files.length}`;
      await octokit.issues.createComment({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: prNumber,
        body: comment,
      });
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
