#Portfolio Alignment
Shows pie charts for Investment Allocations of the lowest level Portfolio Items within the scope of the selected Release and current project scope settings.

This app using the Rally 2.0 SDK and the WSAPI API.  This app does NOT use the Lookback API. This app can be used on a Release filtered dashboard.

The data set for the charts include all lowest level Portfolio Items in the current project scope that are explicitly associated
with the selected release (or no release if "Unscheduled" is selected).

![ScreenShot](/images/portfolio-alignment.png)


####Investment Planning Targets Pie Chart
Displays the desired distribution of investment categories which is
configurable through a dialog by clicking the "Configure Targets..." button.  Allocations must add up to 100%.

Allocation distributions for the desired Target pie are saved on a per Release and per App basis. If no target allocations were previously
defined, then the allocations will by default be evenly distributed amongst all categories.

The distributions will be saved for each release where the Name, Start Date and End Date are the same.  If a release has the same name as other release, but different
start and end dates, targets will be saved separately for those.

Note that because the target allocation settings are saved for the workspace, the users must be a workspace admin for those targets to be persisted when
the app is reloaded.  Target changes for a release by any user will persist for the session.

If an Investment Category name is changed from what has been saved, the allocation whose investment category name has been
changed will be put into a "None" category until it can be properly reassigned by clicking on the "Configure Targets..." button.


#### Preliminary Feature Estimates Pie Chart
Displays the allocation of the Preliminary Estimate values for the lowest level Portfolio Item types for
each Investment category.  If a portfolio item does not have a Preliminary Estimate assigned, then its data is not included in the chart.

#### Estimated User Story Points Pie Chart
Displays the total of the Plan Estimate values for all User Story descendants of the lowest level Portfolio Item types included in the data set.
This value is pulled from the LeafStoryPlanEstimateTotal field on the feature.  This means that while the Portfolio Item data set is scoped
to the currently selected Release and Project settings, the inclusion of stories that make up the total Plan Estimate for this chart is independent
of the Project or Release that the stories are associated with.

If a Portfolio Item does not have an Investment Category defined, then it's story plan estimates will be included in the "None" category.

If there is a "None" category explicitly defined as one of the options for the Investment Category field, then the story plan estimates
for portfolio items with an Investment Category value equal to "None" will be combined with the story plan estimates for portfolio items
with no Investment Category assigned.

#### Accepted User Story Points Pie Chart
Displays the total of the Accdepted Plan Estimate values for all User Story descendants of the lowest level Portfolio Item types included in the data set.
This value is pulled from the AcceptedLeafStoryPlanEstimateTotal field on the feature.  This means that while the Portfolio Item data set is scoped
to the currently selected Release and Project settings, the inclusion of Accepted stories that make up the total Plan Estimate for this chart is independent
of the Project or Release that the stories are associated with.

If a Portfolio Item does not have an Investment Category defined, then it's accepted story plan estimates will be included in the "None" category.

If there is a "None" category explicitly defined as one of the options for the Investment Category field, then the accepted story plan estimates
for portfolio items with an Investment Category value equal to "None" will be combined with the story plan estimates for portfolio items
with no Investment Category assigned.

## Development Notes

A set of lines representing burn/scope/ideal for the
current project and DIRECT CHILDREN ONLY.

### First Load

If you've just downloaded this from github and you want to do development, 
you're going to need to have these installed:

 * node.js
 * grunt-cli
 * grunt-init
 
Since you're getting this from github, we assume you have the command line
version of git also installed.  If not, go get git.

If you have those three installed, just type this in the root directory here
to get set up to develop:

  npm install

### Structure

  * src/javascript:  All the JS files saved here will be compiled into the 
  target html file
  * src/style: All of the stylesheets saved here will be compiled into the 
  target html file
  * test/fast: Fast jasmine tests go here.  There should also be a helper 
  file that is loaded first for creating mocks and doing other shortcuts
  (fastHelper.js) **Tests should be in a file named <something>-spec.js**
  * test/slow: Slow jasmine tests go here.  There should also be a helper
  file that is loaded first for creating mocks and doing other shortcuts 
  (slowHelper.js) **Tests should be in a file named <something>-spec.js**
  * templates: This is where templates that are used to create the production
  and debug html files live.  The advantage of using these templates is that
  you can configure the behavior of the html around the JS.
  * config.json: This file contains the configuration settings necessary to
  create the debug and production html files.  Server is only used for debug,
  name, className and sdk are used for both.
  * package.json: This file lists the dependencies for grunt
  * auth.json: This file should NOT be checked in.  Create this to run the
  slow test specs.  It should look like:
    {
        "username":"you@company.com",
        "password":"secret"
    }
  
### Usage of the grunt file
####Tasks
    
##### grunt debug

Use grunt debug to create the debug html file.  You only need to run this when you have added new files to
the src directories.

##### grunt build

Use grunt build to create the production html file.  We still have to copy the html file to a panel to test.

##### grunt test-fast

Use grunt test-fast to run the Jasmine tests in the fast directory.  Typically, the tests in the fast 
directory are more pure unit tests and do not need to connect to Rally.

##### grunt test-slow

Use grunt test-slow to run the Jasmine tests in the slow directory.  Typically, the tests in the slow
directory are more like integration tests in that they require connecting to Rally and interacting with
data.
