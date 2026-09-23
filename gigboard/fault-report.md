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

#1
Location: /routes/venue.js | Line 16
What's wrong: This line of code only holds a placeholder string, not an actual value that will be accepted. I presume this should be ADMIN because in the requests.http file it says specficially on line 95 that only ADMIN may manage venues, which is exactly what this /routes/venue.js is doing.

Correct behaviour: This placeholder value should be ADMIN.

How I found it: When I added the authorization token to the 'Create a venue as ORGANISER' request, the return went from 'not authorised' to 'forbidden' ### Create a venue as ORGANISER (expect 403 - only ADMIN may manage venues) also stood out as a blatant contradiction. This made me look closely at /routes/venue.

Severity: High/totally broken.

Fixed: not yet. This fault will be one of the faults presented as fixed in presentation.

#2
Location: /routes/venue.js | Line 17
What's wrong: In the same file as fault #1, the updateVenue function passes allows users with ORGANISER privliges to update the venue. Again, according to this '### Create a venue as ORGANISER (expect 403 - only ADMIN may manage venues)', only ADMIN has the privlege to manage venues.

How I found it: I expected to only see ADMIN privliges in /routes/venue.js, so ORAGNISER stood out.

Correct behaviour: This value should be changed from 'ORGANISER' to 'ADMIN'

Severity: High. Allows users with lesser privliges the ability to update venus.

Fixed: Not yet

#3