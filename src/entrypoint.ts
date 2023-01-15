// entrypoint.ts: ensures that there are no 'export' statements in the build.
// this is necessary because OpenLoader is not loaded in an ES module scope.

import "./main";