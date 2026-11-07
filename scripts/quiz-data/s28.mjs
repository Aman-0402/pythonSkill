// Session 28: Capstone, Part 2: Analyse and Visualise
// [question, right answer, [wrong answers], explanation, optional Python that prints the right answer]

export default [
  [`What pattern do we follow for every question?`, `Ask, calculate, chart, say it in a sentence`, [`Load, delete, save`, `Guess, chart, stop`, `Chart first, ask later`], `Every chart should answer a question.`],
  [`Why show both order counts and revenue?`, `They can tell different stories`, [`Charts need two bars`, `Revenue is always wrong`, `pandas needs both`], `Stationery led on orders and Gadgets on money.`],
  [`What does pct_change() give?`, `The change from the previous value as a fraction`, [`The percent of the total`, `The maximum change`, `A sorted column`], `The first row has nothing to compare, so it is NaN.`],
  [`Six months of revenue go up and down. What is the honest claim?`, `No steady trend, and too short to see seasons`, [`Sales are growing fast`, `Sales will crash`, `December is always best`], `Do not invent a trend.`],
  [`Discounted and full-price orders look nearly the same. What do you report?`, `No clear effect of discounts in this data`, [`Discounts cause happiness`, `Nothing, leave it out`, `Keep looking until a pattern appears`], `No effect is a finding.`],
  [`Why turn city counts into row percentages?`, `To compare cities of different sizes fairly`, [`To make the numbers smaller`, `Because counts are wrong`, `To sort the cities`], `div(..., axis=0) does this.`],
  [`Why not report that amount is linked to price?`, `Amount was calculated from price`, [`The correlation is low`, `Price has blanks`, `Amount is text`], `A built-in link is not a discovery.`],
  [`What are the three parts of a strong insight?`, `What we found, why it matters, what to do`, [`Title, chart, footer`, `Mean, median, mode`, `Load, clean, save`], `Use a number in the finding.`],
  [`Why print insight numbers with f-strings?`, `So they always match the data`, [`They look bigger`, `Python requires it`, `They run faster`], `Hand-typed numbers go stale.`],
  [`What belongs in a limits paragraph?`, `What the analysis cannot tell you`, [`The chart colours`, `Your favourite result`, `The list of imports`], `Small sample, one shop, blanks, cause.`],
  [`Which makes a better report?`, `Four clear charts that each answer a question`, [`Fourteen random charts`, `No charts at all`, `One chart with ten colours`], `Quality beats quantity.`],
  [`How do you read 25 orders with no rating?`, `Rating results describe only those who rated`, [`Those customers gave 0`, `Those customers gave 5`, `The orders do not exist`], `State this in the limits.`],
]
