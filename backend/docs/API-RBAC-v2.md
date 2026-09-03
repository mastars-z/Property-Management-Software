# Property Management Software — API RBAC Contract v2.0

## 1. Purpose

This document defines the Role-Based Access Control (RBAC) rules for the
Property Management Software REST API.

It is an extension of the team's API contract and defines the authorization
boundaries for the four approved application roles:

- Administrator
- Property Owner
- Property Manager
- Tenant

Authorization is enforced server-side.

---

## 2. Authentication

Protected API resources require authenticated users through Laravel Sanctum.

Authentication middleware:

    auth:sanctum

Unauthenticated requests must be rejected with HTTP 401.

Authenticated users who do not have permission to access a protected
resource must receive HTTP 403.

---

## 3. Roles

### 3.1 Administrator

The Administrator manages platform-level users, roles, access,
configuration, and system oversight.

Administrator access is system-wide and is not a substitute for
property-level ownership or management.

Role value:

    administrator

### 3.2 Property Owner

The Property Owner owns one or more properties and is responsible for
ownership-level oversight.

Role value:

    property_owner

Property Owners may access resources within properties they own.

### 3.3 Property Manager

The Property Manager manages properties on behalf of an owner or
organization under an explicitly assigned authorization scope.

Role value:

    property_manager

Property Managers may access resources within properties explicitly
assigned to them.

### 3.4 Tenant

The Tenant occupies an assigned rental unit under a lease.

Role value:

    tenant

Tenants may access their own profile, lease, payment history/payment
workflow, and maintenance requests.

---

## 4. Authorization Middleware

Role-based route protection uses the Laravel middleware:

    role:<role>

Examples:

    role:administrator
    role:property_owner
    role:property_manager
    role:tenant

The middleware verifies that the authenticated user's role matches one of
the roles authorized for the route.

---

## 5. Role and Permission Matrix

| Resource / Action | Administrator | Property Owner | Property Manager | Tenant |
|---|---|---|---|---|
| Platform administration | Full | No | No | No |
| User administration | Full | No | No | No |
| Role/access administration | Full | No | No | No |
| Create property | As authorized | Own properties | No* | No |
| View property | Full | Owned properties | Assigned properties | Relevant rental context |
| Update property | Full | Owned properties | Assigned properties | No |
| Archive property | Full | Owned properties | Assigned properties | No |
| Manage units | Full | Units in owned properties | Units in assigned properties | View relevant unit |
| Manage tenants | Full | Tenants within owned properties | Tenants within assigned properties | Own record only |
| Manage leases | Full | Leases within owned properties | Leases within assigned properties | Own lease only |
| Manage payments | Full | Payments within owned properties | Payments within assigned properties | Own payment history/workflow |
| Manage maintenance | Full | Within owned properties | Within assigned properties | Own requests |
| Financial/operational reports | Full | Owned properties | Assigned properties | No |
| Own profile | Yes | Yes | Yes | Yes |

\* Property Manager property creation is subject to the final approved
property-management workflow and authorization scope.

---

## 6. Ownership and Assignment Rules

Role checks alone are not sufficient for property-level authorization.

### Property Owner

A Property Owner must only access properties where:

    properties.owner_id = authenticated_user.id

The owner relationship defines ownership scope.

### Property Manager

A Property Manager must only access properties where an active
PropertyManagerAssignment exists for the authenticated manager.

The manager relationship defines assignment scope.

### Tenant

A Tenant must only access records belonging to that tenant or records
directly associated with the tenant's active lease.

Tenant access must not provide access to another tenant's records.

---

## 7. Policy Layer

The application provides policy skeletons for the four approved roles:

    App\Policies\AdministratorPolicy
    App\Policies\PropertyOwnerPolicy
    App\Policies\PropertyManagerPolicy
    App\Policies\TenantPolicy

Each policy provides an `access` authorization method based on the
authenticated user's role.

Property-level and record-level policies will enforce ownership,
assignment, and tenant-specific access when the corresponding domain
models are implemented.

---

## 8. HTTP Authorization Responses

### 401 Unauthenticated

Returned when a protected endpoint is accessed without valid
authentication.

Example:

    {
        "message": "Unauthenticated."
    }

### 403 Forbidden

Returned when an authenticated user does not have the required role or
authorization scope.

Example:

    {
        "message": "Unauthorized. You do not have permission to access this resource."
    }

### 404 Not Found

Resources outside a user's authorization scope may be treated as not
visible where appropriate, preventing unauthorized resource discovery.

---

## 9. Security Requirements

1. Authorization must be enforced server-side.
2. Frontend route protection must not be treated as a security boundary.
3. Role checks must use the authenticated user.
4. Property Owners and Property Managers must remain separate roles.
5. Property Managers must be restricted to explicitly assigned properties.
6. Tenants must be restricted to their own tenant-related records.
7. Administrator access must not automatically imply property ownership.
8. Authorization failures must not expose sensitive implementation details.

---

## 10. API Implementation Rules

All protected endpoints must use:

    auth:sanctum

Role-specific endpoints may additionally use:

    role:<role>

Resource-level authorization must use policies or equivalent server-side
authorization logic.

Controllers must not rely solely on frontend authorization checks.

---

## 11. Testing Requirements

Authorization tests must verify the boundaries between all four roles.

At minimum, tests must verify:

- Administrator access to administrator resources.
- Property Owner access to owned properties.
- Property Owner rejection from another owner's properties.
- Property Manager access to assigned properties.
- Property Manager rejection from unassigned properties.
- Tenant access to their own records.
- Tenant rejection from another tenant's records.
- Rejection of unauthenticated requests.
- Rejection of authenticated users with insufficient permissions.

---

## 12. Contract Version

Version:

    2.0

Status:

    Development Contract

This document must be updated when an approved authorization rule changes.

Breaking API authorization changes require team approval before
implementation.

---

## 13. Source of Authority

The RBAC rules in this document are derived from the approved
Property Management Software SRS v2.0.

The SRS defines the four roles and their authorization boundaries,
including ownership scope for Property Owners, assignment scope for
Property Managers, and tenant-specific access. 