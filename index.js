import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  try {
    // Get the threshold value
    const threshold = Number(core.getInput('threshold'));

    // Get the pull request number
    const pr = github.context.payload.pull_request;
    const prNumber = pr?.number;

    // Get the number of file changes
    const octokit = github.getOctokit(core.getInput('github_token'));
    const files = await octokit.pulls?.listFiles({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      pull_number: prNumber,
    });

    // Check if the number of file changes is greater than the threshold
    if (files.data.length > threshold) {
      // Comment on the pull request
      const comment = `The number of file changes (${files.data.length}) exceeds the threshold of ${threshold}.`;
      octokit.issues.createComment({
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
