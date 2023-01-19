import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  try {
    // Get the threshold value
    const threshold = Number(core.getInput('threshold'));

    // Get the pull request number
    const prNumber = github.context.payload.pull_request?.number;

    // Get the number of file changes
    const octokit = github.getOctokit(core.getInput('github_token'));
    const { data: files } = await octokit.pulls.listFiles({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      pull_number: prNumber,
    });

    // Check if the number of file changes is greater than the threshold
    if (files.length > threshold) {
      // Comment on the pull request
      const comment = `The number of file changes (${files.length}) exceeds the threshold of ${threshold}.`;
      await octokit.issues.createComment({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        issue_number: prNumber,
        body: comment,
      });
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
