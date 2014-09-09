# Satmap Candidate Test
This is the test for candidates for the current developer position at satmap systems. This test has 5 parts, candidates should limit themselves to two hours. 

This test may be designed to run longer than the two hour mark however. If you reach the time mark without completion you should consider the test finished. 

## Workflow
- Candidates should clone this repository to their own account. DONT FORK! 
	(Ideally the new repo would be private but for those without a pro account this isn't required, just avoid linking to the reposity in a public way as other candidates may discover you and your code.)
	
- @satmap should be added as a collaborator on this new repository.

- The issues listed within the issues tab of this repository should be fixed on the new repo each with its own issue branch.
	(You don't need to remake these issues in your repo unless you'd like to, simple reference ticket numbers in branch names)
	
- Pull requests should be created for each of issue branches. These requests should explain the changes in your code.

- Once all issues have been resolved you should submit a link to your new repository by email to alan.cole@satmap.com for review.


# PHP
Files in ``./php`` this script should load the data in  ``./data/table.sql`` receive a longitude and latitude and return the closet 10 entries. 

This script does not calculate distance. See ticket #1 for more information in improvements/ 