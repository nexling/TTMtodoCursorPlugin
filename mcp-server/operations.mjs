// Generated from the TTM-Todo OpenAPI spec. Do not edit by hand;
// regenerate with: node scripts/generate-operations.mjs /path/to/openapi.json
export const OPERATIONS = [
  {
    "name": "auth_status",
    "method": "GET",
    "path": "/api/auth/status",
    "operationId": "auth_status_api_auth_status_get",
    "summary": "Auth Status",
    "tags": [
      "auth"
    ],
    "description": "Auth Status. GET /api/auth/status.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [],
    "inputSchema": {
      "type": "object",
      "properties": {},
      "required": [],
      "additionalProperties": false
    }
  },
  {
    "name": "setup",
    "method": "POST",
    "path": "/api/auth/setup",
    "operationId": "setup_api_auth_setup_post",
    "summary": "Setup",
    "tags": [
      "auth"
    ],
    "description": "Setup. POST /api/auth/setup.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [
      "username",
      "password"
    ],
    "bodyRequired": true,
    "required": [
      "username",
      "password"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "username": {
          "type": "string",
          "maxLength": 80,
          "minLength": 1
        },
        "password": {
          "type": "string",
          "maxLength": 200,
          "minLength": 8
        }
      },
      "required": [
        "username",
        "password"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "login",
    "method": "POST",
    "path": "/api/auth/login",
    "operationId": "login_api_auth_login_post",
    "summary": "Login",
    "tags": [
      "auth"
    ],
    "description": "Login. POST /api/auth/login.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [
      "username",
      "password"
    ],
    "bodyRequired": true,
    "required": [
      "username",
      "password"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "username": {
          "type": "string",
          "maxLength": 80,
          "minLength": 1
        },
        "password": {
          "type": "string",
          "maxLength": 200,
          "minLength": 1
        }
      },
      "required": [
        "username",
        "password"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "logout",
    "method": "POST",
    "path": "/api/auth/logout",
    "operationId": "logout_api_auth_logout_post",
    "summary": "Logout",
    "tags": [
      "auth"
    ],
    "description": "Logout. POST /api/auth/logout.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [],
    "inputSchema": {
      "type": "object",
      "properties": {},
      "required": [],
      "additionalProperties": false
    }
  },
  {
    "name": "org_settings",
    "method": "GET",
    "path": "/api/orgs/settings",
    "operationId": "org_settings_api_orgs_settings_get",
    "summary": "Org Settings",
    "tags": [
      "orgs"
    ],
    "description": "Org Settings. GET /api/orgs/settings.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [],
    "inputSchema": {
      "type": "object",
      "properties": {},
      "required": [],
      "additionalProperties": false
    }
  },
  {
    "name": "switch_org",
    "method": "POST",
    "path": "/api/orgs/switch",
    "operationId": "switch_org_api_orgs_switch_post",
    "summary": "Switch Org",
    "tags": [
      "orgs"
    ],
    "description": "Switch Org. POST /api/orgs/switch.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [
      "organization_id"
    ],
    "bodyRequired": true,
    "required": [
      "organization_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "organization_id": {
          "type": "string"
        }
      },
      "required": [
        "organization_id"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "rename",
    "method": "POST",
    "path": "/api/orgs/rename",
    "operationId": "rename_api_orgs_rename_post",
    "summary": "Rename",
    "tags": [
      "orgs"
    ],
    "description": "Rename. POST /api/orgs/rename.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [
      "name"
    ],
    "bodyRequired": true,
    "required": [
      "name"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "maxLength": 120,
          "minLength": 1
        }
      },
      "required": [
        "name"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "create_invite",
    "method": "POST",
    "path": "/api/orgs/invitations",
    "operationId": "create_invite_api_orgs_invitations_post",
    "summary": "Create Invite",
    "tags": [
      "orgs"
    ],
    "description": "Create Invite. POST /api/orgs/invitations.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [
      "email",
      "role"
    ],
    "bodyRequired": true,
    "required": [
      "email"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string",
          "maxLength": 254,
          "minLength": 3
        },
        "role": {
          "type": "string",
          "default": "user"
        }
      },
      "required": [
        "email"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "patch_membership",
    "method": "POST",
    "path": "/api/orgs/memberships/{membership_id}",
    "operationId": "patch_membership_api_orgs_memberships__membership_id__post",
    "summary": "Patch Membership",
    "tags": [
      "orgs"
    ],
    "description": "Patch Membership. POST /api/orgs/memberships/{membership_id}.",
    "pathParams": [
      "membership_id"
    ],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [
      "role"
    ],
    "bodyRequired": true,
    "required": [
      "membership_id",
      "role"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "membership_id": {
          "type": "string",
          "description": "Path parameter for /api/orgs/memberships/{membership_id}"
        },
        "role": {
          "type": "string",
          "maxLength": 32,
          "minLength": 1
        }
      },
      "required": [
        "membership_id",
        "role"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "make_owner",
    "method": "POST",
    "path": "/api/orgs/memberships/{membership_id}/make-owner",
    "operationId": "make_owner_api_orgs_memberships__membership_id__make_owner_post",
    "summary": "Make Owner",
    "tags": [
      "orgs"
    ],
    "description": "Make Owner. POST /api/orgs/memberships/{membership_id}/make-owner.",
    "pathParams": [
      "membership_id"
    ],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [
      "organization_name",
      "owner_email"
    ],
    "bodyRequired": true,
    "required": [
      "membership_id",
      "organization_name",
      "owner_email"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "membership_id": {
          "type": "string",
          "description": "Path parameter for /api/orgs/memberships/{membership_id}/make-owner"
        },
        "organization_name": {
          "type": "string",
          "maxLength": 120,
          "minLength": 1
        },
        "owner_email": {
          "type": "string",
          "maxLength": 254,
          "minLength": 3
        }
      },
      "required": [
        "membership_id",
        "organization_name",
        "owner_email"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "kick_member",
    "method": "POST",
    "path": "/api/orgs/memberships/{membership_id}/kick",
    "operationId": "kick_member_api_orgs_memberships__membership_id__kick_post",
    "summary": "Kick Member",
    "tags": [
      "orgs"
    ],
    "description": "Kick Member. POST /api/orgs/memberships/{membership_id}/kick.",
    "pathParams": [
      "membership_id"
    ],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [
      "membership_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "membership_id": {
          "type": "string",
          "description": "Path parameter for /api/orgs/memberships/{membership_id}/kick"
        }
      },
      "required": [
        "membership_id"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "revoke_invite",
    "method": "POST",
    "path": "/api/orgs/invitations/{invitation_id}/revoke",
    "operationId": "revoke_invite_api_orgs_invitations__invitation_id__revoke_post",
    "summary": "Revoke Invite",
    "tags": [
      "orgs"
    ],
    "description": "Revoke Invite. POST /api/orgs/invitations/{invitation_id}/revoke.",
    "pathParams": [
      "invitation_id"
    ],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [
      "invitation_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "invitation_id": {
          "type": "string",
          "description": "Path parameter for /api/orgs/invitations/{invitation_id}/revoke"
        }
      },
      "required": [
        "invitation_id"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "overview",
    "method": "GET",
    "path": "/api/plan/overview",
    "operationId": "overview_api_plan_overview_get",
    "summary": "Overview",
    "tags": [
      "plan"
    ],
    "description": "Overview. GET /api/plan/overview. Plan routes may need x_organization_id when the user has more than one licensed organization.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [
      "X-Organization-Id"
    ],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "x_organization_id": {
          "type": "string",
          "description": "Sent as the X-Organization-Id header. Required for plan calls when the user belongs to more than one licensed organization."
        }
      },
      "required": [],
      "additionalProperties": false
    }
  },
  {
    "name": "create_department",
    "method": "POST",
    "path": "/api/plan/departments",
    "operationId": "create_department_api_plan_departments_post",
    "summary": "Create Department",
    "tags": [
      "plan"
    ],
    "description": "Create Department. POST /api/plan/departments. Plan routes may need x_organization_id when the user has more than one licensed organization.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [
      "X-Organization-Id"
    ],
    "bodyParams": [
      "name",
      "color"
    ],
    "bodyRequired": true,
    "required": [
      "name"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "x_organization_id": {
          "type": "string",
          "description": "Sent as the X-Organization-Id header. Required for plan calls when the user belongs to more than one licensed organization."
        },
        "name": {
          "type": "string",
          "maxLength": 80,
          "minLength": 1
        },
        "color": {
          "type": "string",
          "maxLength": 16,
          "default": "#7c9a6d"
        }
      },
      "required": [
        "name"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "update_department",
    "method": "PATCH",
    "path": "/api/plan/departments/{department_id}",
    "operationId": "update_department_api_plan_departments__department_id__patch",
    "summary": "Update Department",
    "tags": [
      "plan"
    ],
    "description": "Update Department. PATCH /api/plan/departments/{department_id}. Plan routes may need x_organization_id when the user has more than one licensed organization.",
    "pathParams": [
      "department_id"
    ],
    "queryParams": [],
    "headerParams": [
      "X-Organization-Id"
    ],
    "bodyParams": [
      "name",
      "color",
      "sort_order",
      "member_ids",
      "lead_ids"
    ],
    "bodyRequired": true,
    "required": [
      "department_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "department_id": {
          "type": "string",
          "description": "Path parameter for /api/plan/departments/{department_id}"
        },
        "x_organization_id": {
          "type": "string",
          "description": "Sent as the X-Organization-Id header. Required for plan calls when the user belongs to more than one licensed organization."
        },
        "name": {
          "type": "string",
          "maxLength": 80,
          "minLength": 1
        },
        "color": {
          "type": "string"
        },
        "sort_order": {
          "type": "integer"
        },
        "member_ids": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "lead_ids": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "department_id"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "delete_department",
    "method": "DELETE",
    "path": "/api/plan/departments/{department_id}",
    "operationId": "delete_department_api_plan_departments__department_id__delete",
    "summary": "Delete Department",
    "tags": [
      "plan"
    ],
    "description": "Delete Department. DELETE /api/plan/departments/{department_id}. Plan routes may need x_organization_id when the user has more than one licensed organization.",
    "pathParams": [
      "department_id"
    ],
    "queryParams": [],
    "headerParams": [
      "X-Organization-Id"
    ],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [
      "department_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "department_id": {
          "type": "string",
          "description": "Path parameter for /api/plan/departments/{department_id}"
        },
        "x_organization_id": {
          "type": "string",
          "description": "Sent as the X-Organization-Id header. Required for plan calls when the user belongs to more than one licensed organization."
        }
      },
      "required": [
        "department_id"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "update_person_departments",
    "method": "PUT",
    "path": "/api/plan/people/{user_id}/departments",
    "operationId": "update_person_departments_api_plan_people__user_id__departments_put",
    "summary": "Update Person Departments",
    "tags": [
      "plan"
    ],
    "description": "Update Person Departments. PUT /api/plan/people/{user_id}/departments. Plan routes may need x_organization_id when the user has more than one licensed organization.",
    "pathParams": [
      "user_id"
    ],
    "queryParams": [],
    "headerParams": [
      "X-Organization-Id"
    ],
    "bodyParams": [
      "department_ids",
      "lead_ids"
    ],
    "bodyRequired": true,
    "required": [
      "user_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "user_id": {
          "type": "string",
          "description": "Path parameter for /api/plan/people/{user_id}/departments"
        },
        "x_organization_id": {
          "type": "string",
          "description": "Sent as the X-Organization-Id header. Required for plan calls when the user belongs to more than one licensed organization."
        },
        "department_ids": {
          "type": "array",
          "default": [],
          "items": {
            "type": "string"
          }
        },
        "lead_ids": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "user_id"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "department_work",
    "method": "GET",
    "path": "/api/plan/department-work",
    "operationId": "department_work_api_plan_department_work_get",
    "summary": "Department Work",
    "tags": [
      "plan"
    ],
    "description": "Department Work. GET /api/plan/department-work. Plan routes may need x_organization_id when the user has more than one licensed organization.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [
      "X-Organization-Id"
    ],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "x_organization_id": {
          "type": "string",
          "description": "Sent as the X-Organization-Id header. Required for plan calls when the user belongs to more than one licensed organization."
        }
      },
      "required": [],
      "additionalProperties": false
    }
  },
  {
    "name": "my_todos",
    "method": "GET",
    "path": "/api/plan/my-todos",
    "operationId": "my_todos_api_plan_my_todos_get",
    "summary": "My Todos",
    "tags": [
      "plan"
    ],
    "description": "My Todos. GET /api/plan/my-todos. Plan routes may need x_organization_id when the user has more than one licensed organization.",
    "pathParams": [],
    "queryParams": [
      "scope"
    ],
    "headerParams": [
      "X-Organization-Id"
    ],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "scope": {
          "type": "string",
          "default": "mine",
          "description": "Query parameter scope"
        },
        "x_organization_id": {
          "type": "string",
          "description": "Sent as the X-Organization-Id header. Required for plan calls when the user belongs to more than one licensed organization."
        }
      },
      "required": [],
      "additionalProperties": false
    }
  },
  {
    "name": "reorder_departments",
    "method": "POST",
    "path": "/api/plan/departments/reorder",
    "operationId": "reorder_departments_api_plan_departments_reorder_post",
    "summary": "Reorder Departments",
    "tags": [
      "plan"
    ],
    "description": "Reorder Departments. POST /api/plan/departments/reorder. Plan routes may need x_organization_id when the user has more than one licensed organization.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [
      "X-Organization-Id"
    ],
    "bodyParams": [
      "ids"
    ],
    "bodyRequired": true,
    "required": [
      "ids"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "x_organization_id": {
          "type": "string",
          "description": "Sent as the X-Organization-Id header. Required for plan calls when the user belongs to more than one licensed organization."
        },
        "ids": {
          "type": "array",
          "minItems": 1,
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "ids"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "create_template",
    "method": "POST",
    "path": "/api/plan/templates",
    "operationId": "create_template_api_plan_templates_post",
    "summary": "Create Template",
    "tags": [
      "plan"
    ],
    "description": "Create Template. POST /api/plan/templates. Plan routes may need x_organization_id when the user has more than one licensed organization.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [
      "X-Organization-Id"
    ],
    "bodyParams": [
      "name"
    ],
    "bodyRequired": true,
    "required": [
      "name"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "x_organization_id": {
          "type": "string",
          "description": "Sent as the X-Organization-Id header. Required for plan calls when the user belongs to more than one licensed organization."
        },
        "name": {
          "type": "string",
          "maxLength": 120,
          "minLength": 1
        }
      },
      "required": [
        "name"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "get_template",
    "method": "GET",
    "path": "/api/plan/templates/{template_id}",
    "operationId": "get_template_api_plan_templates__template_id__get",
    "summary": "Get Template",
    "tags": [
      "plan"
    ],
    "description": "Get Template. GET /api/plan/templates/{template_id}. Plan routes may need x_organization_id when the user has more than one licensed organization.",
    "pathParams": [
      "template_id"
    ],
    "queryParams": [],
    "headerParams": [
      "X-Organization-Id"
    ],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [
      "template_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "template_id": {
          "type": "string",
          "description": "Path parameter for /api/plan/templates/{template_id}"
        },
        "x_organization_id": {
          "type": "string",
          "description": "Sent as the X-Organization-Id header. Required for plan calls when the user belongs to more than one licensed organization."
        }
      },
      "required": [
        "template_id"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "save_template",
    "method": "PUT",
    "path": "/api/plan/templates/{template_id}",
    "operationId": "save_template_api_plan_templates__template_id__put",
    "summary": "Save Template",
    "tags": [
      "plan"
    ],
    "description": "Save Template. PUT /api/plan/templates/{template_id}. Plan routes may need x_organization_id when the user has more than one licensed organization.",
    "pathParams": [
      "template_id"
    ],
    "queryParams": [],
    "headerParams": [
      "X-Organization-Id"
    ],
    "bodyParams": [
      "name",
      "schedule_direction",
      "delivery_offset",
      "tasks"
    ],
    "bodyRequired": true,
    "required": [
      "template_id",
      "tasks"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "template_id": {
          "type": "string",
          "description": "Path parameter for /api/plan/templates/{template_id}"
        },
        "x_organization_id": {
          "type": "string",
          "description": "Sent as the X-Organization-Id header. Required for plan calls when the user belongs to more than one licensed organization."
        },
        "name": {
          "type": "string",
          "maxLength": 120,
          "minLength": 1
        },
        "schedule_direction": {
          "type": "string"
        },
        "delivery_offset": {
          "type": "integer"
        },
        "tasks": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "title": {
                "type": "string",
                "maxLength": 500,
                "minLength": 1
              },
              "notes": {
                "type": "string"
              },
              "department_id": {
                "type": "string"
              },
              "day_offset": {
                "type": "integer"
              },
              "week_offset": {
                "type": "integer",
                "default": 0
              },
              "notify_days_before": {
                "type": "integer",
                "minimum": 0,
                "maximum": 365
              },
              "sort_order": {
                "type": "integer",
                "default": 0
              },
              "predecessor_ids": {
                "type": "array",
                "default": [],
                "items": {
                  "type": "string"
                }
              },
              "parent_id": {
                "type": "string"
              }
            },
            "required": [
              "title"
            ]
          }
        }
      },
      "required": [
        "template_id",
        "tasks"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "delete_template",
    "method": "DELETE",
    "path": "/api/plan/templates/{template_id}",
    "operationId": "delete_template_api_plan_templates__template_id__delete",
    "summary": "Delete Template",
    "tags": [
      "plan"
    ],
    "description": "Delete Template. DELETE /api/plan/templates/{template_id}. Plan routes may need x_organization_id when the user has more than one licensed organization.",
    "pathParams": [
      "template_id"
    ],
    "queryParams": [],
    "headerParams": [
      "X-Organization-Id"
    ],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [
      "template_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "template_id": {
          "type": "string",
          "description": "Path parameter for /api/plan/templates/{template_id}"
        },
        "x_organization_id": {
          "type": "string",
          "description": "Sent as the X-Organization-Id header. Required for plan calls when the user belongs to more than one licensed organization."
        }
      },
      "required": [
        "template_id"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "create_project",
    "method": "POST",
    "path": "/api/plan/projects",
    "operationId": "create_project_api_plan_projects_post",
    "summary": "Create Project",
    "tags": [
      "plan"
    ],
    "description": "Create Project. POST /api/plan/projects. Plan routes may need x_organization_id when the user has more than one licensed organization.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [
      "X-Organization-Id"
    ],
    "bodyParams": [
      "name",
      "template_id",
      "schedule_direction",
      "start_week",
      "delivery_on"
    ],
    "bodyRequired": true,
    "required": [
      "name"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "x_organization_id": {
          "type": "string",
          "description": "Sent as the X-Organization-Id header. Required for plan calls when the user belongs to more than one licensed organization."
        },
        "name": {
          "type": "string",
          "maxLength": 120,
          "minLength": 1
        },
        "template_id": {
          "type": "string"
        },
        "schedule_direction": {
          "type": "string"
        },
        "start_week": {
          "type": "string"
        },
        "delivery_on": {
          "type": "string"
        }
      },
      "required": [
        "name"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "update_project",
    "method": "PATCH",
    "path": "/api/plan/projects/{project_id}",
    "operationId": "update_project_api_plan_projects__project_id__patch",
    "summary": "Update Project",
    "tags": [
      "plan"
    ],
    "description": "Update Project. PATCH /api/plan/projects/{project_id}. Plan routes may need x_organization_id when the user has more than one licensed organization.",
    "pathParams": [
      "project_id"
    ],
    "queryParams": [],
    "headerParams": [
      "X-Organization-Id"
    ],
    "bodyParams": [
      "name",
      "delivery_on",
      "move_cards"
    ],
    "bodyRequired": true,
    "required": [
      "project_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "project_id": {
          "type": "string",
          "description": "Path parameter for /api/plan/projects/{project_id}"
        },
        "x_organization_id": {
          "type": "string",
          "description": "Sent as the X-Organization-Id header. Required for plan calls when the user belongs to more than one licensed organization."
        },
        "name": {
          "type": "string",
          "maxLength": 120,
          "minLength": 1
        },
        "delivery_on": {
          "type": "string"
        },
        "move_cards": {
          "type": "boolean"
        }
      },
      "required": [
        "project_id"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "delete_project",
    "method": "DELETE",
    "path": "/api/plan/projects/{project_id}",
    "operationId": "delete_project_api_plan_projects__project_id__delete",
    "summary": "Delete Project",
    "tags": [
      "plan"
    ],
    "description": "Delete Project. DELETE /api/plan/projects/{project_id}. Plan routes may need x_organization_id when the user has more than one licensed organization.",
    "pathParams": [
      "project_id"
    ],
    "queryParams": [],
    "headerParams": [
      "X-Organization-Id"
    ],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [
      "project_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "project_id": {
          "type": "string",
          "description": "Path parameter for /api/plan/projects/{project_id}"
        },
        "x_organization_id": {
          "type": "string",
          "description": "Sent as the X-Organization-Id header. Required for plan calls when the user belongs to more than one licensed organization."
        }
      },
      "required": [
        "project_id"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "get_project",
    "method": "GET",
    "path": "/api/plan/projects/{project_id}",
    "operationId": "get_project_api_plan_projects__project_id__get",
    "summary": "Get Project",
    "tags": [
      "plan"
    ],
    "description": "Get Project. GET /api/plan/projects/{project_id}. Plan routes may need x_organization_id when the user has more than one licensed organization.",
    "pathParams": [
      "project_id"
    ],
    "queryParams": [],
    "headerParams": [
      "X-Organization-Id"
    ],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [
      "project_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "project_id": {
          "type": "string",
          "description": "Path parameter for /api/plan/projects/{project_id}"
        },
        "x_organization_id": {
          "type": "string",
          "description": "Sent as the X-Organization-Id header. Required for plan calls when the user belongs to more than one licensed organization."
        }
      },
      "required": [
        "project_id"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "create_task",
    "method": "POST",
    "path": "/api/plan/projects/{project_id}/tasks",
    "operationId": "create_task_api_plan_projects__project_id__tasks_post",
    "summary": "Create Task",
    "tags": [
      "plan"
    ],
    "description": "Create Task. POST /api/plan/projects/{project_id}/tasks. Plan routes may need x_organization_id when the user has more than one licensed organization.",
    "pathParams": [
      "project_id"
    ],
    "queryParams": [],
    "headerParams": [
      "X-Organization-Id"
    ],
    "bodyParams": [
      "title",
      "notes",
      "department_id",
      "assignee_user_id",
      "due_on",
      "week_start",
      "notify_days_before",
      "predecessor_ids",
      "parent_id"
    ],
    "bodyRequired": true,
    "required": [
      "project_id",
      "title"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "project_id": {
          "type": "string",
          "description": "Path parameter for /api/plan/projects/{project_id}/tasks"
        },
        "x_organization_id": {
          "type": "string",
          "description": "Sent as the X-Organization-Id header. Required for plan calls when the user belongs to more than one licensed organization."
        },
        "title": {
          "type": "string",
          "maxLength": 500,
          "minLength": 1
        },
        "notes": {
          "type": "string"
        },
        "department_id": {
          "type": "string"
        },
        "assignee_user_id": {
          "type": "string"
        },
        "due_on": {
          "type": "string"
        },
        "week_start": {
          "type": "string"
        },
        "notify_days_before": {
          "type": "integer",
          "minimum": 0,
          "maximum": 365
        },
        "predecessor_ids": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "parent_id": {
          "type": "string"
        }
      },
      "required": [
        "project_id",
        "title"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "update_task",
    "method": "PATCH",
    "path": "/api/plan/tasks/{task_id}",
    "operationId": "update_task_api_plan_tasks__task_id__patch",
    "summary": "Update Task",
    "tags": [
      "plan"
    ],
    "description": "Update Task. PATCH /api/plan/tasks/{task_id}. Plan routes may need x_organization_id when the user has more than one licensed organization.",
    "pathParams": [
      "task_id"
    ],
    "queryParams": [],
    "headerParams": [
      "X-Organization-Id"
    ],
    "bodyParams": [
      "title",
      "notes",
      "department_id",
      "assignee_user_id",
      "due_on",
      "week_start",
      "notify_days_before",
      "status",
      "predecessor_ids",
      "sort_order"
    ],
    "bodyRequired": true,
    "required": [
      "task_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "task_id": {
          "type": "string",
          "description": "Path parameter for /api/plan/tasks/{task_id}"
        },
        "x_organization_id": {
          "type": "string",
          "description": "Sent as the X-Organization-Id header. Required for plan calls when the user belongs to more than one licensed organization."
        },
        "title": {
          "type": "string",
          "maxLength": 500,
          "minLength": 1
        },
        "notes": {
          "type": "string"
        },
        "department_id": {
          "type": "string"
        },
        "assignee_user_id": {
          "type": "string"
        },
        "due_on": {
          "type": "string"
        },
        "week_start": {
          "type": "string"
        },
        "notify_days_before": {
          "type": "integer",
          "minimum": 0,
          "maximum": 365
        },
        "status": {
          "type": "string"
        },
        "predecessor_ids": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "sort_order": {
          "type": "integer"
        }
      },
      "required": [
        "task_id"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "delete_task",
    "method": "DELETE",
    "path": "/api/plan/tasks/{task_id}",
    "operationId": "delete_task_api_plan_tasks__task_id__delete",
    "summary": "Delete Task",
    "tags": [
      "plan"
    ],
    "description": "Delete Task. DELETE /api/plan/tasks/{task_id}. Plan routes may need x_organization_id when the user has more than one licensed organization.",
    "pathParams": [
      "task_id"
    ],
    "queryParams": [],
    "headerParams": [
      "X-Organization-Id"
    ],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [
      "task_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "task_id": {
          "type": "string",
          "description": "Path parameter for /api/plan/tasks/{task_id}"
        },
        "x_organization_id": {
          "type": "string",
          "description": "Sent as the X-Organization-Id header. Required for plan calls when the user belongs to more than one licensed organization."
        }
      },
      "required": [
        "task_id"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "move_task",
    "method": "POST",
    "path": "/api/plan/tasks/{task_id}/move",
    "operationId": "move_task_api_plan_tasks__task_id__move_post",
    "summary": "Move Task",
    "tags": [
      "plan"
    ],
    "description": "Move Task. POST /api/plan/tasks/{task_id}/move. Plan routes may need x_organization_id when the user has more than one licensed organization.",
    "pathParams": [
      "task_id"
    ],
    "queryParams": [],
    "headerParams": [
      "X-Organization-Id"
    ],
    "bodyParams": [
      "department_id",
      "due_on",
      "week_start",
      "before_id"
    ],
    "bodyRequired": true,
    "required": [
      "task_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "task_id": {
          "type": "string",
          "description": "Path parameter for /api/plan/tasks/{task_id}/move"
        },
        "x_organization_id": {
          "type": "string",
          "description": "Sent as the X-Organization-Id header. Required for plan calls when the user belongs to more than one licensed organization."
        },
        "department_id": {
          "type": "string"
        },
        "due_on": {
          "type": "string"
        },
        "week_start": {
          "type": "string"
        },
        "before_id": {
          "type": "string"
        }
      },
      "required": [
        "task_id"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "related_tasks",
    "method": "GET",
    "path": "/api/plan/tasks/{task_id}/related",
    "operationId": "related_tasks_api_plan_tasks__task_id__related_get",
    "summary": "Related Tasks",
    "tags": [
      "plan"
    ],
    "description": "Related Tasks. GET /api/plan/tasks/{task_id}/related. Plan routes may need x_organization_id when the user has more than one licensed organization.",
    "pathParams": [
      "task_id"
    ],
    "queryParams": [],
    "headerParams": [
      "X-Organization-Id"
    ],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [
      "task_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "task_id": {
          "type": "string",
          "description": "Path parameter for /api/plan/tasks/{task_id}/related"
        },
        "x_organization_id": {
          "type": "string",
          "description": "Sent as the X-Organization-Id header. Required for plan calls when the user belongs to more than one licensed organization."
        }
      },
      "required": [
        "task_id"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "connected_tasks",
    "method": "GET",
    "path": "/api/plan/tasks/{task_id}/connected",
    "operationId": "connected_tasks_api_plan_tasks__task_id__connected_get",
    "summary": "Connected Tasks",
    "tags": [
      "plan"
    ],
    "description": "Connected Tasks. GET /api/plan/tasks/{task_id}/connected. Plan routes may need x_organization_id when the user has more than one licensed organization.",
    "pathParams": [
      "task_id"
    ],
    "queryParams": [],
    "headerParams": [
      "X-Organization-Id"
    ],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [
      "task_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "task_id": {
          "type": "string",
          "description": "Path parameter for /api/plan/tasks/{task_id}/connected"
        },
        "x_organization_id": {
          "type": "string",
          "description": "Sent as the X-Organization-Id header. Required for plan calls when the user belongs to more than one licensed organization."
        }
      },
      "required": [
        "task_id"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "reschedule",
    "method": "POST",
    "path": "/api/plan/tasks/{task_id}/reschedule",
    "operationId": "reschedule_api_plan_tasks__task_id__reschedule_post",
    "summary": "Reschedule",
    "tags": [
      "plan"
    ],
    "description": "Reschedule. POST /api/plan/tasks/{task_id}/reschedule. Plan routes may need x_organization_id when the user has more than one licensed organization.",
    "pathParams": [
      "task_id"
    ],
    "queryParams": [],
    "headerParams": [
      "X-Organization-Id"
    ],
    "bodyParams": [
      "due_on",
      "shift_upstream",
      "shift_following",
      "department_id",
      "before_id",
      "due_at"
    ],
    "bodyRequired": true,
    "required": [
      "task_id",
      "due_on"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "task_id": {
          "type": "string",
          "description": "Path parameter for /api/plan/tasks/{task_id}/reschedule"
        },
        "x_organization_id": {
          "type": "string",
          "description": "Sent as the X-Organization-Id header. Required for plan calls when the user belongs to more than one licensed organization."
        },
        "due_on": {
          "type": "string"
        },
        "shift_upstream": {
          "type": "boolean",
          "default": false
        },
        "shift_following": {
          "type": "boolean",
          "default": false
        },
        "department_id": {
          "type": "string"
        },
        "before_id": {
          "type": "string"
        },
        "due_at": {
          "type": "string",
          "format": "date-time"
        }
      },
      "required": [
        "task_id",
        "due_on"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "delete_task_attachment",
    "method": "DELETE",
    "path": "/api/plan/tasks/{task_id}/attachments/{attachment_id}",
    "operationId": "delete_task_attachment_api_plan_tasks__task_id__attachments__attachment_id__delete",
    "summary": "Delete Task Attachment",
    "tags": [
      "plan"
    ],
    "description": "Delete Task Attachment. DELETE /api/plan/tasks/{task_id}/attachments/{attachment_id}. Plan routes may need x_organization_id when the user has more than one licensed organization.",
    "pathParams": [
      "task_id",
      "attachment_id"
    ],
    "queryParams": [],
    "headerParams": [
      "X-Organization-Id"
    ],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [
      "task_id",
      "attachment_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "task_id": {
          "type": "string",
          "description": "Path parameter for /api/plan/tasks/{task_id}/attachments/{attachment_id}"
        },
        "attachment_id": {
          "type": "string",
          "description": "Path parameter for /api/plan/tasks/{task_id}/attachments/{attachment_id}"
        },
        "x_organization_id": {
          "type": "string",
          "description": "Sent as the X-Organization-Id header. Required for plan calls when the user belongs to more than one licensed organization."
        }
      },
      "required": [
        "task_id",
        "attachment_id"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "admin_home",
    "method": "GET",
    "path": "/api/admin",
    "operationId": "admin_home_api_admin_get",
    "summary": "Admin Home",
    "tags": [
      "admin"
    ],
    "description": "Admin Home. GET /api/admin.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [],
    "inputSchema": {
      "type": "object",
      "properties": {},
      "required": [],
      "additionalProperties": false
    }
  },
  {
    "name": "put_individual",
    "method": "POST",
    "path": "/api/admin/licenses/individual",
    "operationId": "put_individual_api_admin_licenses_individual_post",
    "summary": "Put Individual",
    "tags": [
      "admin"
    ],
    "description": "Put Individual. POST /api/admin/licenses/individual.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [
      "email",
      "expires_at",
      "license_id"
    ],
    "bodyRequired": true,
    "required": [
      "email",
      "expires_at"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string",
          "maxLength": 254,
          "minLength": 3
        },
        "expires_at": {
          "type": "string"
        },
        "license_id": {
          "type": "string"
        }
      },
      "required": [
        "email",
        "expires_at"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "add_organization",
    "method": "POST",
    "path": "/api/admin/organizations",
    "operationId": "add_organization_api_admin_organizations_post",
    "summary": "Add Organization",
    "tags": [
      "admin"
    ],
    "description": "Add Organization. POST /api/admin/organizations.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [
      "name",
      "owner_email"
    ],
    "bodyRequired": true,
    "required": [
      "name",
      "owner_email"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "maxLength": 120,
          "minLength": 1
        },
        "owner_email": {
          "type": "string",
          "maxLength": 254,
          "minLength": 3
        }
      },
      "required": [
        "name",
        "owner_email"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "admin_make_owner",
    "method": "POST",
    "path": "/api/admin/organizations/{organization_id}/memberships/{membership_id}/make-owner",
    "operationId": "make_owner_api_admin_organizations__organization_id__memberships__membership_id__make_owner_post",
    "summary": "Make Owner",
    "tags": [
      "admin"
    ],
    "description": "Make Owner. POST /api/admin/organizations/{organization_id}/memberships/{membership_id}/make-owner.",
    "pathParams": [
      "organization_id",
      "membership_id"
    ],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [
      "organization_name",
      "owner_email"
    ],
    "bodyRequired": true,
    "required": [
      "organization_id",
      "membership_id",
      "organization_name",
      "owner_email"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "organization_id": {
          "type": "string",
          "description": "Path parameter for /api/admin/organizations/{organization_id}/memberships/{membership_id}/make-owner"
        },
        "membership_id": {
          "type": "string",
          "description": "Path parameter for /api/admin/organizations/{organization_id}/memberships/{membership_id}/make-owner"
        },
        "organization_name": {
          "type": "string",
          "maxLength": 120,
          "minLength": 1
        },
        "owner_email": {
          "type": "string",
          "maxLength": 254,
          "minLength": 3
        }
      },
      "required": [
        "organization_id",
        "membership_id",
        "organization_name",
        "owner_email"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "put_organization",
    "method": "POST",
    "path": "/api/admin/licenses/organization",
    "operationId": "put_organization_api_admin_licenses_organization_post",
    "summary": "Put Organization",
    "tags": [
      "admin"
    ],
    "description": "Put Organization. POST /api/admin/licenses/organization.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [
      "organization_id",
      "seat_count",
      "expires_at",
      "license_id"
    ],
    "bodyRequired": true,
    "required": [
      "organization_id",
      "seat_count",
      "expires_at"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "organization_id": {
          "type": "string"
        },
        "seat_count": {
          "type": "integer",
          "minimum": 1
        },
        "expires_at": {
          "type": "string"
        },
        "license_id": {
          "type": "string"
        }
      },
      "required": [
        "organization_id",
        "seat_count",
        "expires_at"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "remove_license",
    "method": "POST",
    "path": "/api/admin/licenses/{license_id}/delete",
    "operationId": "remove_license_api_admin_licenses__license_id__delete_post",
    "summary": "Remove License",
    "tags": [
      "admin"
    ],
    "description": "Remove License. POST /api/admin/licenses/{license_id}/delete.",
    "pathParams": [
      "license_id"
    ],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [
      "license_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "license_id": {
          "type": "string",
          "description": "Path parameter for /api/admin/licenses/{license_id}/delete"
        }
      },
      "required": [
        "license_id"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "test_mail",
    "method": "POST",
    "path": "/api/admin/test-mail",
    "operationId": "test_mail_api_admin_test_mail_post",
    "summary": "Test Mail",
    "tags": [
      "admin"
    ],
    "description": "Test Mail. POST /api/admin/test-mail.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [
      "email"
    ],
    "bodyRequired": true,
    "required": [
      "email"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string",
          "maxLength": 254,
          "minLength": 3
        }
      },
      "required": [
        "email"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "list_buckets",
    "method": "GET",
    "path": "/api/buckets",
    "operationId": "list_buckets_api_buckets_get",
    "summary": "List Buckets",
    "tags": [
      "buckets"
    ],
    "description": "List Buckets. GET /api/buckets.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [],
    "inputSchema": {
      "type": "object",
      "properties": {},
      "required": [],
      "additionalProperties": false
    }
  },
  {
    "name": "create_bucket",
    "method": "POST",
    "path": "/api/buckets",
    "operationId": "create_bucket_api_buckets_post",
    "summary": "Create Bucket",
    "tags": [
      "buckets"
    ],
    "description": "Create Bucket. POST /api/buckets.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [
      "name",
      "color",
      "parent_id"
    ],
    "bodyRequired": true,
    "required": [
      "name"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "maxLength": 80,
          "minLength": 1
        },
        "color": {
          "type": "string",
          "maxLength": 16,
          "default": "#7c9a6d"
        },
        "parent_id": {
          "type": "string"
        }
      },
      "required": [
        "name"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "reorder_buckets",
    "method": "POST",
    "path": "/api/buckets/reorder",
    "operationId": "reorder_buckets_api_buckets_reorder_post",
    "summary": "Reorder Buckets",
    "tags": [
      "buckets"
    ],
    "description": "Reorder Buckets. POST /api/buckets/reorder.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [
      "ids"
    ],
    "bodyRequired": true,
    "required": [
      "ids"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "ids": {
          "type": "array",
          "minItems": 1,
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "ids"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "update_bucket",
    "method": "PATCH",
    "path": "/api/buckets/{bucket_id}",
    "operationId": "update_bucket_api_buckets__bucket_id__patch",
    "summary": "Update Bucket",
    "tags": [
      "buckets"
    ],
    "description": "Update Bucket. PATCH /api/buckets/{bucket_id}.",
    "pathParams": [
      "bucket_id"
    ],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [
      "name",
      "color",
      "sort_order",
      "parent_id"
    ],
    "bodyRequired": true,
    "required": [
      "bucket_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "bucket_id": {
          "type": "string",
          "description": "Path parameter for /api/buckets/{bucket_id}"
        },
        "name": {
          "type": "string",
          "maxLength": 80,
          "minLength": 1
        },
        "color": {
          "type": "string",
          "maxLength": 16
        },
        "sort_order": {
          "type": "integer"
        },
        "parent_id": {
          "type": "string"
        }
      },
      "required": [
        "bucket_id"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "delete_bucket",
    "method": "DELETE",
    "path": "/api/buckets/{bucket_id}",
    "operationId": "delete_bucket_api_buckets__bucket_id__delete",
    "summary": "Delete Bucket",
    "tags": [
      "buckets"
    ],
    "description": "Delete Bucket. DELETE /api/buckets/{bucket_id}.",
    "pathParams": [
      "bucket_id"
    ],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [
      "bucket_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "bucket_id": {
          "type": "string",
          "description": "Path parameter for /api/buckets/{bucket_id}"
        }
      },
      "required": [
        "bucket_id"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "list_items",
    "method": "GET",
    "path": "/api/items",
    "operationId": "list_items_api_items_get",
    "summary": "List Items",
    "tags": [
      "items"
    ],
    "description": "List Items. GET /api/items.",
    "pathParams": [],
    "queryParams": [
      "bucket_id",
      "include_done",
      "include_descendants",
      "completed_since",
      "completed_before"
    ],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "bucket_id": {
          "type": "string",
          "description": "Query parameter bucket_id"
        },
        "include_done": {
          "type": "boolean",
          "default": false,
          "description": "Query parameter include_done"
        },
        "include_descendants": {
          "type": "boolean",
          "default": false,
          "description": "Query parameter include_descendants"
        },
        "completed_since": {
          "type": "string",
          "format": "date-time",
          "description": "Query parameter completed_since"
        },
        "completed_before": {
          "type": "string",
          "format": "date-time",
          "description": "Query parameter completed_before"
        }
      },
      "required": [],
      "additionalProperties": false
    }
  },
  {
    "name": "create_item",
    "method": "POST",
    "path": "/api/items",
    "operationId": "create_item_route_api_items_post",
    "summary": "Create an item",
    "tags": [
      "items"
    ],
    "description": "Create an item. POST /api/items. JSON for text fields (default source=api). multipart/form-data for files (title, notes, bucket_id, parent_id, source, due_at, image, files).",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [
      "title",
      "notes",
      "bucket_id",
      "parent_id",
      "source",
      "due_at"
    ],
    "bodyRequired": false,
    "required": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "maxLength": 500
        },
        "notes": {
          "type": "string"
        },
        "bucket_id": {
          "type": "string"
        },
        "parent_id": {
          "type": "string"
        },
        "source": {
          "type": "string",
          "maxLength": 32
        },
        "due_at": {
          "type": "string",
          "format": "date-time"
        }
      },
      "required": [],
      "additionalProperties": false
    }
  },
  {
    "name": "reorder_items",
    "method": "POST",
    "path": "/api/items/reorder",
    "operationId": "reorder_items_api_items_reorder_post",
    "summary": "Reorder Items",
    "tags": [
      "items"
    ],
    "description": "Reorder Items. POST /api/items/reorder.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [
      "ids"
    ],
    "bodyRequired": true,
    "required": [
      "ids"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "ids": {
          "type": "array",
          "minItems": 1,
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "ids"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "get_item",
    "method": "GET",
    "path": "/api/items/{item_id}",
    "operationId": "get_item_api_items__item_id__get",
    "summary": "Get Item",
    "tags": [
      "items"
    ],
    "description": "Get Item. GET /api/items/{item_id}.",
    "pathParams": [
      "item_id"
    ],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [
      "item_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "item_id": {
          "type": "string",
          "description": "Path parameter for /api/items/{item_id}"
        }
      },
      "required": [
        "item_id"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "patch_item",
    "method": "PATCH",
    "path": "/api/items/{item_id}",
    "operationId": "patch_item_api_items__item_id__patch",
    "summary": "Patch Item",
    "tags": [
      "items"
    ],
    "description": "Patch Item. PATCH /api/items/{item_id}.",
    "pathParams": [
      "item_id"
    ],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [
      "title",
      "notes",
      "bucket_id",
      "parent_id",
      "status",
      "due_at",
      "reminder_lead_minutes",
      "remind_at",
      "recur_interval",
      "recur_unit"
    ],
    "bodyRequired": true,
    "required": [
      "item_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "item_id": {
          "type": "string",
          "description": "Path parameter for /api/items/{item_id}"
        },
        "title": {
          "type": "string",
          "maxLength": 500
        },
        "notes": {
          "type": "string"
        },
        "bucket_id": {
          "type": "string"
        },
        "parent_id": {
          "type": "string"
        },
        "status": {
          "type": "string",
          "pattern": "^(open|done)$"
        },
        "due_at": {
          "type": "string",
          "format": "date-time"
        },
        "reminder_lead_minutes": {
          "type": "integer"
        },
        "remind_at": {
          "type": "string",
          "format": "date-time"
        },
        "recur_interval": {
          "type": "integer",
          "minimum": 1,
          "maximum": 999
        },
        "recur_unit": {
          "type": "string"
        }
      },
      "required": [
        "item_id"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "remove_item",
    "method": "DELETE",
    "path": "/api/items/{item_id}",
    "operationId": "remove_item_api_items__item_id__delete",
    "summary": "Remove Item",
    "tags": [
      "items"
    ],
    "description": "Remove Item. DELETE /api/items/{item_id}.",
    "pathParams": [
      "item_id"
    ],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [
      "item_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "item_id": {
          "type": "string",
          "description": "Path parameter for /api/items/{item_id}"
        }
      },
      "required": [
        "item_id"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "delete_attachment",
    "method": "DELETE",
    "path": "/api/items/{item_id}/attachments/{attachment_id}",
    "operationId": "delete_attachment_api_items__item_id__attachments__attachment_id__delete",
    "summary": "Delete Attachment",
    "tags": [
      "items"
    ],
    "description": "Delete Attachment. DELETE /api/items/{item_id}/attachments/{attachment_id}.",
    "pathParams": [
      "item_id",
      "attachment_id"
    ],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [
      "item_id",
      "attachment_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "item_id": {
          "type": "string",
          "description": "Path parameter for /api/items/{item_id}/attachments/{attachment_id}"
        },
        "attachment_id": {
          "type": "string",
          "description": "Path parameter for /api/items/{item_id}/attachments/{attachment_id}"
        }
      },
      "required": [
        "item_id",
        "attachment_id"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "list_tokens",
    "method": "GET",
    "path": "/api/tokens",
    "operationId": "list_tokens_api_tokens_get",
    "summary": "List Tokens",
    "tags": [
      "tokens"
    ],
    "description": "List Tokens. GET /api/tokens.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [],
    "inputSchema": {
      "type": "object",
      "properties": {},
      "required": [],
      "additionalProperties": false
    }
  },
  {
    "name": "create_token",
    "method": "POST",
    "path": "/api/tokens",
    "operationId": "create_token_api_tokens_post",
    "summary": "Create Token",
    "tags": [
      "tokens"
    ],
    "description": "Create Token. POST /api/tokens.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [
      "name",
      "scopes"
    ],
    "bodyRequired": true,
    "required": [
      "name"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "maxLength": 80,
          "minLength": 1
        },
        "scopes": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "name"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "revoke_token",
    "method": "DELETE",
    "path": "/api/tokens/{token_id}",
    "operationId": "revoke_token_api_tokens__token_id__delete",
    "summary": "Revoke Token",
    "tags": [
      "tokens"
    ],
    "description": "Revoke Token. DELETE /api/tokens/{token_id}.",
    "pathParams": [
      "token_id"
    ],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [
      "token_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "token_id": {
          "type": "string",
          "description": "Path parameter for /api/tokens/{token_id}"
        }
      },
      "required": [
        "token_id"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "get_file",
    "method": "GET",
    "path": "/api/files/{attachment_id}",
    "operationId": "get_file_api_files__attachment_id__get",
    "summary": "Get File",
    "tags": [
      "files"
    ],
    "description": "Get File. GET /api/files/{attachment_id}.",
    "pathParams": [
      "attachment_id"
    ],
    "queryParams": [
      "download"
    ],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [
      "attachment_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "attachment_id": {
          "type": "string",
          "description": "Path parameter for /api/files/{attachment_id}"
        },
        "download": {
          "type": "boolean",
          "default": false,
          "description": "Query parameter download"
        }
      },
      "required": [
        "attachment_id"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "remarkable_status",
    "method": "GET",
    "path": "/api/remarkable",
    "operationId": "remarkable_status_api_remarkable_get",
    "summary": "Remarkable Status",
    "tags": [
      "remarkable"
    ],
    "description": "Remarkable Status. GET /api/remarkable.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [],
    "inputSchema": {
      "type": "object",
      "properties": {},
      "required": [],
      "additionalProperties": false
    }
  },
  {
    "name": "remarkable_settings",
    "method": "POST",
    "path": "/api/remarkable/settings",
    "operationId": "remarkable_settings_api_remarkable_settings_post",
    "summary": "Remarkable Settings",
    "tags": [
      "remarkable"
    ],
    "description": "Remarkable Settings. POST /api/remarkable/settings.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [
      "host",
      "user",
      "port",
      "folder",
      "out_folder",
      "key_path",
      "private_key"
    ],
    "bodyRequired": true,
    "required": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "host": {
          "type": "string",
          "maxLength": 200,
          "default": ""
        },
        "user": {
          "type": "string",
          "maxLength": 80,
          "default": "root"
        },
        "port": {
          "type": "integer",
          "minimum": 1,
          "maximum": 65535,
          "default": 21
        },
        "folder": {
          "type": "string",
          "maxLength": 80,
          "default": "TTM-Todo"
        },
        "out_folder": {
          "type": "string",
          "maxLength": 80,
          "default": "From TTM-Todo"
        },
        "key_path": {
          "type": "string",
          "maxLength": 500,
          "default": ""
        },
        "private_key": {
          "type": "string",
          "maxLength": 20000,
          "default": ""
        }
      },
      "required": [],
      "additionalProperties": false
    }
  },
  {
    "name": "remarkable_sync",
    "method": "POST",
    "path": "/api/remarkable/sync",
    "operationId": "remarkable_sync_api_remarkable_sync_post",
    "summary": "Remarkable Sync",
    "tags": [
      "remarkable"
    ],
    "description": "Remarkable Sync. POST /api/remarkable/sync.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [],
    "inputSchema": {
      "type": "object",
      "properties": {},
      "required": [],
      "additionalProperties": false
    }
  },
  {
    "name": "send_to_remarkable",
    "method": "POST",
    "path": "/api/items/{item_id}/remarkable",
    "operationId": "send_to_remarkable_api_items__item_id__remarkable_post",
    "summary": "Send To Remarkable",
    "tags": [
      "remarkable"
    ],
    "description": "Send To Remarkable. POST /api/items/{item_id}/remarkable.",
    "pathParams": [
      "item_id"
    ],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [
      "item_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "item_id": {
          "type": "string",
          "description": "Path parameter for /api/items/{item_id}/remarkable"
        }
      },
      "required": [
        "item_id"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "google_status",
    "method": "GET",
    "path": "/api/google",
    "operationId": "google_status_api_google_get",
    "summary": "Google Status",
    "tags": [
      "google"
    ],
    "description": "Google Status. GET /api/google.",
    "pathParams": [],
    "queryParams": [
      "refresh"
    ],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "refresh": {
          "type": "boolean",
          "default": false,
          "description": "Query parameter refresh"
        }
      },
      "required": [],
      "additionalProperties": false
    }
  },
  {
    "name": "google_tasks_disconnect",
    "method": "POST",
    "path": "/api/google/tasks/disconnect",
    "operationId": "google_tasks_disconnect_api_google_tasks_disconnect_post",
    "summary": "Google Tasks Disconnect",
    "tags": [
      "google"
    ],
    "description": "Google Tasks Disconnect. POST /api/google/tasks/disconnect.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [],
    "inputSchema": {
      "type": "object",
      "properties": {},
      "required": [],
      "additionalProperties": false
    }
  },
  {
    "name": "google_tasks_list",
    "method": "POST",
    "path": "/api/google/tasks/list",
    "operationId": "google_tasks_list_api_google_tasks_list_post",
    "summary": "Google Tasks List",
    "tags": [
      "google"
    ],
    "description": "Google Tasks List. POST /api/google/tasks/list.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [
      "list_id"
    ],
    "bodyRequired": true,
    "required": [
      "list_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "list_id": {
          "type": "string",
          "maxLength": 200,
          "minLength": 1
        }
      },
      "required": [
        "list_id"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "google_keep_connect",
    "method": "POST",
    "path": "/api/google/keep/connect",
    "operationId": "google_keep_connect_api_google_keep_connect_post",
    "summary": "Google Keep Connect",
    "tags": [
      "google"
    ],
    "description": "Google Keep Connect. POST /api/google/keep/connect.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [
      "email",
      "master_token"
    ],
    "bodyRequired": true,
    "required": [
      "email",
      "master_token"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string",
          "maxLength": 200,
          "minLength": 3
        },
        "master_token": {
          "type": "string",
          "maxLength": 500,
          "minLength": 8
        }
      },
      "required": [
        "email",
        "master_token"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "google_keep_disconnect",
    "method": "POST",
    "path": "/api/google/keep/disconnect",
    "operationId": "google_keep_disconnect_api_google_keep_disconnect_post",
    "summary": "Google Keep Disconnect",
    "tags": [
      "google"
    ],
    "description": "Google Keep Disconnect. POST /api/google/keep/disconnect.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [],
    "inputSchema": {
      "type": "object",
      "properties": {},
      "required": [],
      "additionalProperties": false
    }
  },
  {
    "name": "google_keep_lists",
    "method": "POST",
    "path": "/api/google/keep/lists",
    "operationId": "google_keep_lists_api_google_keep_lists_post",
    "summary": "Google Keep Lists",
    "tags": [
      "google"
    ],
    "description": "Google Keep Lists. POST /api/google/keep/lists.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [
      "note_ids",
      "watch_all"
    ],
    "bodyRequired": true,
    "required": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "note_ids": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "watch_all": {
          "type": "boolean",
          "default": false
        }
      },
      "required": [],
      "additionalProperties": false
    }
  },
  {
    "name": "google_sync",
    "method": "POST",
    "path": "/api/google/sync",
    "operationId": "google_sync_api_google_sync_post",
    "summary": "Google Sync",
    "tags": [
      "google"
    ],
    "description": "Google Sync. POST /api/google/sync.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [],
    "inputSchema": {
      "type": "object",
      "properties": {},
      "required": [],
      "additionalProperties": false
    }
  },
  {
    "name": "outlook_status",
    "method": "GET",
    "path": "/api/outlook",
    "operationId": "outlook_status_api_outlook_get",
    "summary": "Outlook Status",
    "tags": [
      "outlook"
    ],
    "description": "Outlook Status. GET /api/outlook.",
    "pathParams": [],
    "queryParams": [
      "refresh"
    ],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "refresh": {
          "type": "boolean",
          "default": false,
          "description": "Query parameter refresh"
        }
      },
      "required": [],
      "additionalProperties": false
    }
  },
  {
    "name": "outlook_disconnect",
    "method": "POST",
    "path": "/api/outlook/disconnect",
    "operationId": "outlook_disconnect_api_outlook_disconnect_post",
    "summary": "Outlook Disconnect",
    "tags": [
      "outlook"
    ],
    "description": "Outlook Disconnect. POST /api/outlook/disconnect.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [
      "account_id"
    ],
    "bodyRequired": false,
    "required": [],
    "inputSchema": {
      "type": "object",
      "properties": {
        "account_id": {
          "type": "string",
          "default": ""
        }
      },
      "required": [],
      "additionalProperties": false
    }
  },
  {
    "name": "outlook_calendars",
    "method": "POST",
    "path": "/api/outlook/calendars",
    "operationId": "outlook_calendars_api_outlook_calendars_post",
    "summary": "Outlook Calendars",
    "tags": [
      "outlook"
    ],
    "description": "Outlook Calendars. POST /api/outlook/calendars.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [
      "account_id",
      "calendar_ids",
      "calendar_colors"
    ],
    "bodyRequired": true,
    "required": [
      "account_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "account_id": {
          "type": "string",
          "maxLength": 320,
          "minLength": 1
        },
        "calendar_ids": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "calendar_colors": {
          "type": "object",
          "additionalProperties": {
            "type": "string"
          }
        }
      },
      "required": [
        "account_id"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "outlook_events",
    "method": "GET",
    "path": "/api/outlook/events",
    "operationId": "outlook_events_api_outlook_events_get",
    "summary": "Outlook Events",
    "tags": [
      "outlook"
    ],
    "description": "Outlook Events. GET /api/outlook/events.",
    "pathParams": [],
    "queryParams": [
      "start",
      "end"
    ],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [
      "start",
      "end"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "start": {
          "type": "string",
          "maxLength": 40,
          "minLength": 8,
          "description": "Query parameter start"
        },
        "end": {
          "type": "string",
          "maxLength": 40,
          "minLength": 8,
          "description": "Query parameter end"
        }
      },
      "required": [
        "start",
        "end"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "ical_status",
    "method": "GET",
    "path": "/api/ical",
    "operationId": "ical_status_api_ical_get",
    "summary": "Ical Status",
    "tags": [
      "ical"
    ],
    "description": "Ical Status. GET /api/ical.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [],
    "inputSchema": {
      "type": "object",
      "properties": {},
      "required": [],
      "additionalProperties": false
    }
  },
  {
    "name": "ical_add_feed",
    "method": "POST",
    "path": "/api/ical/feeds",
    "operationId": "ical_add_feed_api_ical_feeds_post",
    "summary": "Ical Add Feed",
    "tags": [
      "ical"
    ],
    "description": "Ical Add Feed. POST /api/ical/feeds.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [
      "label",
      "url",
      "color"
    ],
    "bodyRequired": true,
    "required": [
      "url"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "label": {
          "type": "string",
          "maxLength": 80,
          "default": ""
        },
        "url": {
          "type": "string",
          "maxLength": 2000,
          "minLength": 12
        },
        "color": {
          "type": "string",
          "maxLength": 16,
          "default": ""
        }
      },
      "required": [
        "url"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "ical_patch_feed",
    "method": "PATCH",
    "path": "/api/ical/feeds/{feed_id}",
    "operationId": "ical_patch_feed_api_ical_feeds__feed_id__patch",
    "summary": "Ical Patch Feed",
    "tags": [
      "ical"
    ],
    "description": "Ical Patch Feed. PATCH /api/ical/feeds/{feed_id}.",
    "pathParams": [
      "feed_id"
    ],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [
      "label",
      "url",
      "color"
    ],
    "bodyRequired": true,
    "required": [
      "feed_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "feed_id": {
          "type": "string",
          "description": "Path parameter for /api/ical/feeds/{feed_id}"
        },
        "label": {
          "type": "string",
          "maxLength": 80
        },
        "url": {
          "type": "string",
          "maxLength": 2000
        },
        "color": {
          "type": "string",
          "maxLength": 16
        }
      },
      "required": [
        "feed_id"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "ical_delete_feed",
    "method": "DELETE",
    "path": "/api/ical/feeds/{feed_id}",
    "operationId": "ical_delete_feed_api_ical_feeds__feed_id__delete",
    "summary": "Ical Delete Feed",
    "tags": [
      "ical"
    ],
    "description": "Ical Delete Feed. DELETE /api/ical/feeds/{feed_id}.",
    "pathParams": [
      "feed_id"
    ],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [
      "feed_id"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "feed_id": {
          "type": "string",
          "description": "Path parameter for /api/ical/feeds/{feed_id}"
        }
      },
      "required": [
        "feed_id"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "ical_events",
    "method": "GET",
    "path": "/api/ical/events",
    "operationId": "ical_events_api_ical_events_get",
    "summary": "Ical Events",
    "tags": [
      "ical"
    ],
    "description": "Ical Events. GET /api/ical/events.",
    "pathParams": [],
    "queryParams": [
      "start",
      "end"
    ],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [
      "start",
      "end"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "start": {
          "type": "string",
          "maxLength": 40,
          "minLength": 8,
          "description": "Query parameter start"
        },
        "end": {
          "type": "string",
          "maxLength": 40,
          "minLength": 8,
          "description": "Query parameter end"
        }
      },
      "required": [
        "start",
        "end"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "calendar_export_status",
    "method": "GET",
    "path": "/api/calendar/export",
    "operationId": "calendar_export_status_api_calendar_export_get",
    "summary": "Calendar Export Status",
    "tags": [
      "calendar-export"
    ],
    "description": "Calendar Export Status. GET /api/calendar/export.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [],
    "inputSchema": {
      "type": "object",
      "properties": {},
      "required": [],
      "additionalProperties": false
    }
  },
  {
    "name": "calendar_export_enable",
    "method": "POST",
    "path": "/api/calendar/export",
    "operationId": "calendar_export_enable_api_calendar_export_post",
    "summary": "Calendar Export Enable",
    "tags": [
      "calendar-export"
    ],
    "description": "Calendar Export Enable. POST /api/calendar/export.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [],
    "inputSchema": {
      "type": "object",
      "properties": {},
      "required": [],
      "additionalProperties": false
    }
  },
  {
    "name": "calendar_export_disable",
    "method": "DELETE",
    "path": "/api/calendar/export",
    "operationId": "calendar_export_disable_api_calendar_export_delete",
    "summary": "Calendar Export Disable",
    "tags": [
      "calendar-export"
    ],
    "description": "Calendar Export Disable. DELETE /api/calendar/export.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [],
    "inputSchema": {
      "type": "object",
      "properties": {},
      "required": [],
      "additionalProperties": false
    }
  },
  {
    "name": "calendar_export_regenerate",
    "method": "POST",
    "path": "/api/calendar/export/regenerate",
    "operationId": "calendar_export_regenerate_api_calendar_export_regenerate_post",
    "summary": "Calendar Export Regenerate",
    "tags": [
      "calendar-export"
    ],
    "description": "Calendar Export Regenerate. POST /api/calendar/export/regenerate.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [],
    "inputSchema": {
      "type": "object",
      "properties": {},
      "required": [],
      "additionalProperties": false
    }
  },
  {
    "name": "calendar_feed",
    "method": "GET",
    "path": "/api/calendar/feed/{token}",
    "operationId": "calendar_feed_api_calendar_feed__token__get",
    "summary": "Calendar Feed",
    "tags": [
      "calendar-export"
    ],
    "description": "Calendar Feed. GET /api/calendar/feed/{token}.",
    "pathParams": [
      "token"
    ],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [
      "token"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "token": {
          "type": "string",
          "description": "Path parameter for /api/calendar/feed/{token}"
        }
      },
      "required": [
        "token"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "get_vapid",
    "method": "GET",
    "path": "/api/push/vapid",
    "operationId": "get_vapid_api_push_vapid_get",
    "summary": "Get Vapid",
    "tags": [
      "push"
    ],
    "description": "Get Vapid. GET /api/push/vapid.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [],
    "inputSchema": {
      "type": "object",
      "properties": {},
      "required": [],
      "additionalProperties": false
    }
  },
  {
    "name": "subscribe",
    "method": "POST",
    "path": "/api/push/subscribe",
    "operationId": "subscribe_api_push_subscribe_post",
    "summary": "Subscribe",
    "tags": [
      "push"
    ],
    "description": "Subscribe. POST /api/push/subscribe.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [
      "endpoint",
      "keys"
    ],
    "bodyRequired": true,
    "required": [
      "endpoint",
      "keys"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "endpoint": {
          "type": "string",
          "maxLength": 2048,
          "minLength": 8
        },
        "keys": {
          "type": "object",
          "properties": {
            "p256dh": {
              "type": "string",
              "maxLength": 200,
              "minLength": 1
            },
            "auth": {
              "type": "string",
              "maxLength": 200,
              "minLength": 1
            }
          },
          "required": [
            "p256dh",
            "auth"
          ]
        }
      },
      "required": [
        "endpoint",
        "keys"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "unsubscribe",
    "method": "DELETE",
    "path": "/api/push/subscribe",
    "operationId": "unsubscribe_api_push_subscribe_delete",
    "summary": "Unsubscribe",
    "tags": [
      "push"
    ],
    "description": "Unsubscribe. DELETE /api/push/subscribe.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [
      "endpoint"
    ],
    "bodyRequired": true,
    "required": [
      "endpoint"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "endpoint": {
          "type": "string",
          "maxLength": 2048,
          "minLength": 8
        }
      },
      "required": [
        "endpoint"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "test_push",
    "method": "POST",
    "path": "/api/push/test",
    "operationId": "test_push_api_push_test_post",
    "summary": "Test Push",
    "tags": [
      "push"
    ],
    "description": "Test Push. POST /api/push/test.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [],
    "inputSchema": {
      "type": "object",
      "properties": {},
      "required": [],
      "additionalProperties": false
    }
  },
  {
    "name": "get_preferences",
    "method": "GET",
    "path": "/api/notifications/preferences",
    "operationId": "get_preferences_api_notifications_preferences_get",
    "summary": "Get Preferences",
    "tags": [
      "notifications"
    ],
    "description": "Get Preferences. GET /api/notifications/preferences.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [],
    "inputSchema": {
      "type": "object",
      "properties": {},
      "required": [],
      "additionalProperties": false
    }
  },
  {
    "name": "patch_preferences",
    "method": "PATCH",
    "path": "/api/notifications/preferences",
    "operationId": "patch_preferences_api_notifications_preferences_patch",
    "summary": "Patch Preferences",
    "tags": [
      "notifications"
    ],
    "description": "Patch Preferences. PATCH /api/notifications/preferences.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [
      "category",
      "enabled",
      "project_id"
    ],
    "bodyRequired": true,
    "required": [
      "category"
    ],
    "inputSchema": {
      "type": "object",
      "properties": {
        "category": {
          "type": "string",
          "maxLength": 32,
          "minLength": 1
        },
        "enabled": {
          "type": "boolean"
        },
        "project_id": {
          "type": "string"
        }
      },
      "required": [
        "category"
      ],
      "additionalProperties": false
    }
  },
  {
    "name": "live_stream",
    "method": "GET",
    "path": "/api/live",
    "operationId": "live_stream_api_live_get",
    "summary": "Live Stream",
    "tags": [
      "live"
    ],
    "description": "Live Stream. GET /api/live.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [],
    "inputSchema": {
      "type": "object",
      "properties": {},
      "required": [],
      "additionalProperties": false
    }
  },
  {
    "name": "health",
    "method": "GET",
    "path": "/api/health",
    "operationId": "health_api_health_get",
    "summary": "Health",
    "tags": [],
    "description": "Health. GET /api/health.",
    "pathParams": [],
    "queryParams": [],
    "headerParams": [],
    "bodyParams": [],
    "bodyRequired": false,
    "required": [],
    "inputSchema": {
      "type": "object",
      "properties": {},
      "required": [],
      "additionalProperties": false
    }
  }
];

export const SKIPPED_OPERATIONS = [
  {
    "method": "GET",
    "path": "/logout",
    "operationId": "logout_logout_get",
    "reason": "Auth0 HTML logout redirect"
  },
  {
    "method": "GET",
    "path": "/login",
    "operationId": "login_login_get",
    "reason": "Auth0 HTML login page"
  },
  {
    "method": "GET",
    "path": "/callback",
    "operationId": "callback_callback_get",
    "reason": "Auth0 HTML callback"
  },
  {
    "method": "POST",
    "path": "/api/plan/tasks/{task_id}/attachments",
    "operationId": "add_task_attachments_api_plan_tasks__task_id__attachments_post",
    "reason": "multipart/form-data only (not a JSON body)"
  },
  {
    "method": "POST",
    "path": "/api/items/{item_id}/attachments",
    "operationId": "add_item_attachment_api_items__item_id__attachments_post",
    "reason": "multipart/form-data only (not a JSON body)"
  },
  {
    "method": "POST",
    "path": "/api/inbox",
    "operationId": "capture_inbox_api_inbox_post",
    "reason": "Capture Inbox has no request body in the published spec"
  },
  {
    "method": "GET",
    "path": "/api/google/tasks/connect",
    "operationId": "google_tasks_connect_api_google_tasks_connect_get",
    "reason": "Google OAuth connect page"
  },
  {
    "method": "GET",
    "path": "/api/google/callback",
    "operationId": "google_callback_api_google_callback_get",
    "reason": "Google OAuth callback page"
  },
  {
    "method": "GET",
    "path": "/api/outlook/connect",
    "operationId": "outlook_connect_api_outlook_connect_get",
    "reason": "Outlook OAuth connect page"
  },
  {
    "method": "GET",
    "path": "/api/outlook/callback",
    "operationId": "outlook_callback_api_outlook_callback_get",
    "reason": "Outlook OAuth callback page"
  },
  {
    "method": "POST",
    "path": "/share-target",
    "operationId": "share_target_share_target_post",
    "reason": "PWA share-target HTML redirect"
  },
  {
    "method": "GET",
    "path": "/{full_path}",
    "operationId": "spa__full_path__get",
    "reason": "SPA catch-all"
  }
];
