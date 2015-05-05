#Portfolio Alignment
Shows pie charts for Investment Allocations of the lowest level Portfolio Items within the scope of the selected Release and current project scope settings.

This app using the Rally 2.0 SDK and the WSAPI API.  This app does NOT use the Lookback API. This app can be used on a Release filtered dashboard.

The data set for the charts include all lowest level Portfolio Items in the current project scope that are explicitly associated
with the selected release (or no release if "Unscheduled" is selected).

![ScreenShot](/images/portfolio-alignment.png)


####Investment Planning Targets Pie Chart
Displays the desired distribution of investment categories which is
configurable through a dialog by clicking the "Configure Targets..." button.  Allocations must add up to 100%.

Allocation distributions for the desired Target pie are saved on a per App basis. If no target allocations were previously
defined, then the allocations will by default be evenly distributed amongst all categories.

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
