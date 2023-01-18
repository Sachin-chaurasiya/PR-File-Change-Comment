/******/ var __webpack_modules__ = ({

/***/ 514:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 679:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __nccwpck_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	var threw = true;
/******/ 	try {
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 		threw = false;
/******/ 	} finally {
/******/ 		if(threw) delete __webpack_module_cache__[moduleId];
/******/ 	}
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat */
/******/ 
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = new URL('.', import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/* harmony import */ var _actions_core__WEBPACK_IMPORTED_MODULE_0__ = __nccwpck_require__(514);
/* harmony import */ var _actions_github__WEBPACK_IMPORTED_MODULE_1__ = __nccwpck_require__(679);



async function run() {
  try {
    // Get the threshold value
    const threshold = Number(_actions_core__WEBPACK_IMPORTED_MODULE_0__.getInput('threshold'));

    // Get the pull request number
    const pr = _actions_github__WEBPACK_IMPORTED_MODULE_1__.context.payload.pull_request;
    const prNumber = pr.number;

    // Get the number of file changes
    const octokit = new _actions_github__WEBPACK_IMPORTED_MODULE_1__.GitHub(_actions_core__WEBPACK_IMPORTED_MODULE_0__.getInput('github_token'));
    const files = await octokit.pulls.listFiles({
      owner: _actions_github__WEBPACK_IMPORTED_MODULE_1__.context.repo.owner,
      repo: _actions_github__WEBPACK_IMPORTED_MODULE_1__.context.repo.repo,
      pull_number: prNumber,
    });

    // Check if the number of file changes is greater than the threshold
    if (files.data.length > threshold) {
      // Comment on the pull request
      const comment = `The number of file changes (${files.data.length}) exceeds the threshold of ${threshold}.`;
      octokit.issues.createComment({
        owner: _actions_github__WEBPACK_IMPORTED_MODULE_1__.context.repo.owner,
        repo: _actions_github__WEBPACK_IMPORTED_MODULE_1__.context.repo.repo,
        issue_number: prNumber,
        body: comment,
      });
    }
  } catch (error) {
    _actions_core__WEBPACK_IMPORTED_MODULE_0__.setFailed(error.message);
  }
}

run();

})();

