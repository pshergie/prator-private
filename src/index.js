const core = require("@actions/core");
const github = require("@actions/github");

import postComment from "./utils/postComment.js";
import getAutoCommentData from "./utils/getAutoCommentData.js";
import fetchComments from "./utils/fetchComments.js";
import shouldMessageBePosted from "./utils/shouldMessageBePosted.js"
import fetchDiffFiles from "./utils/fetchDiffFiles.js"

async function run() {
  try {
    const [prependData, checksData] = getAutoCommentData();
    const { prependMsg } = prependData;
    const checks = checksData.checks.map((config) => ({
      ...config,
      paths: config.paths.split(",").map((p) => p.trim()),
    }));

    const token = core.getInput("token");
    const octokit = github.getOctokit(token);
    const context = github.context;
    const pullNumber = context.payload.pull_request.number;
    const comments = await fetchComments(context, pullNumber, octokit);
    const diffFilesPaths = await fetchDiffFiles(context, pullNumber, octokit);
    let messagesToPost = [];

    checks.map(({ paths, message }) => {
      if (shouldMessageBePosted(paths, message, diffFilesPaths, comments)) {
        messagesToPost.push(message);
      }
    });

    if (messagesToPost.length > 0) {
      await postComment(prependMsg, messagesToPost, pullNumber, context, octokit);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
