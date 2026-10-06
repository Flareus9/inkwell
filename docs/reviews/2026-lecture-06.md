# Review: AuthService, PostService, and Publish Post Editor

## Architecture

- [x] Route handlers do not contain business logic that belongs in a Service
- [x] Database access is separated into repositories

## Design

- [x] Functions are named based on what they do
- [x] Validation and business logic are not unnecessarily duplicated
- [x] Typed errors are used for expected application errors

## UX and Accessibility

- [x] The PostEditor uses a clear state machine for its behavior
- [x] Errors are displayed to the user
- [x] The publish button is disabled while publishing
- [x] The error message uses `role="alert"`

## Process

- [x] The implementation follows the planned design
- [x] The Workshop 6 scope is limited to the MVP requirements
- [x] No secrets are included in the implementation

## Review Findings

I reviewed the Workshop 6 implementation of AuthService, PostService,
UserRepository, PostRepository, and the PostEditor component.

The architecture is separated into route, service, and repository layers.
Business rules such as password validation and post validation are handled
by the service layer instead of the route handlers.

The PostEditor also uses a state machine instead of multiple independent
boolean states. This keeps the component in one valid state at a time.
The component provides an error message with `role="alert"` and disables
the Publish button while a post is being published.

I did not find any major defects during this self-review.

## Outcome

Accept with no changes required.