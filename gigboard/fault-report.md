# Fault Report

Identify at least eight distinct faults. At least six must be faults you go on to fix.

| #   | Location | What is wrong | Correct behaviour | How found | Severity | Fixed? |
| --- | -------- | ------------- | ----------------- | --------- | -------- | ------ |
| 1   |          |               |                   |           |          |        |
| 2   |          |               |                   |           |          |        |
| 3   |          |               |                   |           |          |        |
| 4   |          |               |                   |           |          |        |
| 5   |          |               |                   |           |          |        |
| 6   |          |               |                   |           |          |        |
| 7   |          |               |                   |           |          |        |
| 8   |          |               |                   |           |          |        |

DISCLAIMER: I tried putting the information directly in the table, but it just broke the formatting.

#1
Location: /routes/venue.js | Line 16
What's wrong: This line of code only holds a placeholder string, not an actual value that will be accepted. I presume this should be ADMIN because in the requests.http file it says specficially on line 95 that only ADMIN may manage venues, which is exactly what this /routes/venue.js is doing.

Correct behaviour: This placeholder value should be ADMIN to match permissions in the Permissions Matrix.

How I found it: When I added the authorization token to the 'Create a venue as ORGANISER' request, the return went from 'not authorised' to 'forbidden' ### Create a venue as ORGANISER (expect 403 - only ADMIN may manage venues) also stood out as a blatant contradiction. This made me look closely at /routes/venue.

Severity: Very high/totally broken.

Fixed: not yet. This fault will be one of the faults presented as fixed in presentation.


#2
Location: /routes/venue.js | Line 17
What's wrong: In the same file as fault #1, the updateVenue function passes allows users with ORGANISER privliges to update the venue. Again, according to this '### Create a venue as ORGANISER (expect 403 - only ADMIN may manage venues)', only ADMIN has the privlege to manage venues.

How I found it: I expected to only see ADMIN privliges in /routes/venue.js, so ORAGNISER stood out.

Correct behaviour: This value should be changed from 'ORGANISER' to 'ADMIN' to match Permissions Matrix.

Severity: Very high. Allows users with lesser privliges the ability to update venus.

Fixed: Not yet


#3
Location: /routes/venue.js | Line 18

What's wrong: 'deleteVenue' has no user authentication, no user assigned and doesn't attempt to check user privleges.

How I found it: I noticed the previous two functions 'createVenue' and 'updateVenue' from #1 and #2 both go through jwtAuth, rbac AND take in a role to check privlige before execution. The 'deleteVenue' doesn't go through either of these.

I added an id of '1' to The Vault in seed.js, reset prisma and reseeded. 
### Delete a venue without a token (expect 401)
DELETE http://localhost:3000/api/venues/1 -- this allowed me to delete the venue with no permissions, or even being logged in.

Correct behaviour: 'deleteVenue' should check if the user is logged in with 'jwtAuth' and that their privlige allows them to actually execute this function with 'rbac'. Also needs an actual user designation to validate with rbac they have the correct permissions.

Severity: Very high.


#4
Location: /routes/gig.js | Line 17

What's wrong: 'updateGig only has privleges for ADMIN users. The Permissions Matrix says ORGANISERS have permission to create, update and delete gigs.

How I found it: I went through all .js files in /routes looking for functions that didn't have matching either authentication, rbac reference or privleged accounts assigned (ORGANISER,ADMIN). I referred to the permissions matrix to see who had permission to make, delete and update gigs.

Correct behaviour: 'ORGANISER' would be added to the 'updateGig' function as per the permissions matrix so anyone logged in as an ORGANISER can update gigs.

Severity: Very high. Organisers would not be able to update gigs.


#5
Location: /controllers/auth.js | Line 50

What's wrong: When a user tries to login with correct email and incorrect password, they are told 'Incorrect password'. This is basic security, informing any user trying to access the service that the email used does actually exist.

How I found it: By trying to create a user with an already existing email address using the request:
### Register with duplicate email (expect 409)
POST http://localhost:3000/api/auth/register

Correct behaviour: The returned message would say 'Incorrect email or password' so it doesn't give away and information to potential malicious users.

Severity: Low

#6

#8 ALL ERROR MESSAGES GENERIC. Too big a task to add cusomtised error messages for each error. This is one I won't fix.
