define({ "api": [
  {
    "type": "post",
    "url": "/login",
    "title": "login - init session.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/login"
      }
    ],
    "version": "0.1.0",
    "name": "login",
    "group": "Access",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 0 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": 0,\n  \"response\": true\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "username",
            "description": "<p>UserName of the User.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "password",
            "description": "<p>password of the User.</p> "
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "Access"
  },
  {
    "type": "get",
    "url": "/logout",
    "title": "logout - close session.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/logout"
      }
    ],
    "version": "0.1.0",
    "name": "logout",
    "group": "Access",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 0 good.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Bool</p> ",
            "optional": false,
            "field": "true/false",
            "description": "<p>True o false.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": 0,\n  \"response\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "Access"
  },
  {
    "type": "post",
    "url": "/addresses",
    "title": "create address.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/addresses"
      }
    ],
    "version": "0.1.0",
    "name": "createAddress",
    "group": "Addresses",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "line1",
            "description": "<p>line of the address (Required).</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "line2",
            "description": "<p>line of the address (Required).</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "line3",
            "description": "<p>line of  the address.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "city",
            "description": "<p>city of the address.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "region",
            "description": "<p>region of the address.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "postCode",
            "description": "<p>postCode of the address.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "country",
            "description": "<p>country of the address.</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 0 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"links\" :\n       {\n            \"self\" : \n                {\n                     \"href\": \"String\"    \t\n                } \n       },\n  \"id\": \"String\",\n  \"line1\": \"String\",\n  \"line2\": \"String\",\n  \"line3\": \"String\",\n  \"city\": \"String\",\n  \"region\": \"String\",\n  \"postCode\": \"String\",\n  \"country\": \"String\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"AddressesNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "Addresses"
  },
  {
    "type": "del",
    "url": "/addresses/:id",
    "title": "delete address.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/addresses"
      }
    ],
    "version": "0.1.0",
    "name": "deleteAddress",
    "group": "Addresses",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "id",
            "description": "<p>id of the address (Required).</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 0 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "fileNotFound",
            "description": "<p>The id of the address was not found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"addressNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "Addresses"
  },
  {
    "type": "get",
    "url": "/addresses/:id",
    "title": "address - get one address by id.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/addresses/:id"
      }
    ],
    "version": "0.1.0",
    "name": "getAddress",
    "group": "Addresses",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 200 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"links\" :\n       {\n            \"self\" : \n                {\n                     \"href\": \"String\"    \t\n                } \n       },\n  \"line1\": \"String\",\n  \"line2\": \"String\",\n  \"line3\": \"String\",\n  \"city\": \"String\",\n  \"region\": \"String\",\n  \"postCode\": \"String\",\n  \"country\": \"String\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"addresskNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "Addresses"
  },
  {
    "type": "get",
    "url": "/addresses",
    "title": "addresses - get all addresses.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/addresses"
      }
    ],
    "version": "0.1.0",
    "name": "get_all_addresses",
    "group": "Addresses",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 200 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"links\": \n         {\n             \"self\": \n                 {\n                     \"href\": \"String\"\n                 }\n         },\n     \"embedded\": \n         {\n             \"addresses\": \n                 [\n                     {\n                          \"line1\": \"String\",\n                          \"line2\": \"String\",\n                          \"line3\": \"String\",\n                          \"city\": \"String\",\n                          \"region\": \"String\",\n                          \"postCode\": \"String\",\n                          \"country\": \"String\"\n                     },\n                 ]    \n         },\n         \"links\" : \n             {\n                  \"first\" : \"String\",\n                  \"last\" : \"String\",\n                  \"next\" : \"String\",\n                  \"prev\" : \"String\",\n                  \"self\" : \"String\"\n             },\n         \"page\" : \"Number\",\n         \"pageLimit\" : \"Number\",\n         \"total\" : \"Number\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"AddressesNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "Addresses"
  },
  {
    "type": "put",
    "url": "/addresses/:id",
    "title": "update address.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/addresses"
      }
    ],
    "version": "0.1.0",
    "name": "updateAddress",
    "group": "Addresses",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "id",
            "description": "<p>id of the address (Required).</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 0 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "addressNotFound",
            "description": "<p>The id of the address was not found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"addressNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "Addresses"
  },
  {
    "type": "del",
    "url": "/files/:id",
    "title": "delete file.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/files"
      }
    ],
    "version": "0.1.0",
    "name": "deleteFile",
    "group": "File",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "id",
            "description": "<p>id of the file (Required).</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 0 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "fileNotFound",
            "description": "<p>The id of the file was not found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"fileNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "File"
  },
  {
    "type": "get",
    "url": "/files/:id",
    "title": "get file by id.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/files/:id"
      }
    ],
    "version": "0.1.0",
    "name": "getFile",
    "group": "File",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "id",
            "description": "<p>id of the file (Required).</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 0 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 OK\n{\n  \"ContentType\" : 'application/octet-stream',\n  \"Body\" : \"Image\"  \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "fileNotFound",
            "description": "<p>The id of the file was not found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"fileNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "File"
  },
  {
    "type": "put",
    "url": "/files/:id",
    "title": "update file.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/files"
      }
    ],
    "version": "0.1.0",
    "name": "updateFile",
    "group": "File",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "id",
            "description": "<p>id of the file (Required).</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 0 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "fileNotFound",
            "description": "<p>The id of the file was not found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"fileNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "File"
  },
  {
    "type": "post",
    "url": "/files",
    "title": "upload file.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/files"
      }
    ],
    "version": "0.1.0",
    "name": "uploadFile",
    "group": "File",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "id",
            "description": "<p>id of the file (Required).</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 0 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 OK\n{\n  \"key\": \"String\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "fileNotFound",
            "description": "<p>The id of the file was not found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"fileNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "File"
  },
  {
    "type": "post",
    "url": "/povLinks",
    "title": "create povLink.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/povLinks"
      }
    ],
    "version": "0.1.0",
    "name": "createPOVLinks",
    "group": "POVLink",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "title",
            "description": "<p>title of the povLink (Required).</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "positionPhotosphere",
            "description": "<p>positionPhotosphere of the povLink (Required).</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "positionFlorplan",
            "description": "<p>positionFlorplan the povLink.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "pano",
            "description": "<p>ref to pano entity of the pano.</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 0 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"links\" :\n       {\n            \"self\" : \n                {\n                     \"href\": \"String\"    \t\n                } \n       },\n  \"id\": \"String\",\n  \"title\": \"String\",\n  \"positionPhotosphere\": \"String\",\n  \"positionFlorplan\": \"String\",\n  \"embedded\" : \n      {\n          \"pano\": \"Array\"\n      }      \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"POVLinkNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "POVLink"
  },
  {
    "type": "delete",
    "url": "/povLinks/:id",
    "title": "delete povLinks.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/povLinks/:id"
      }
    ],
    "version": "0.1.0",
    "name": "deletePOVLinks",
    "group": "POVLink",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "id",
            "description": "<p>id of the povLinks (Required).</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 0 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "POVLinksNotFound",
            "description": "<p>The id of the povLinks was not found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"POVLinksNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "POVLink"
  },
  {
    "type": "get",
    "url": "/povLinks/:id",
    "title": "get povLink - get one povLink by id.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/povLinks/:id"
      }
    ],
    "version": "0.1.0",
    "name": "getPOVLinks",
    "group": "POVLink",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 200 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"links\" :\n       {\n            \"self\" : \n                {\n                     \"href\": \"String\"    \t\n                } \n       },\n  \"id\": \"String\",\n  \"title\": \"String\",\n  \"positionPhotosphere\": \"String\",\n  \"positionFlorplan\": \"String\",\n  \"embedded\" : \n      {\n          \"pano\": \"Array\"\n      }      \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"POVLinkNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "POVLink"
  },
  {
    "type": "get",
    "url": "/povLinks",
    "title": "povLinks - get all povLinks.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/povLinks"
      }
    ],
    "version": "0.1.0",
    "name": "get_all_povLinks",
    "group": "POVLink",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 200 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"links\": \n         {\n             \"self\": \n                 {\n                     \"href\": \"String\"\n                 }\n         },\n     \"embedded\": \n         {\n             \"povLinks\": \n                 [\n                     {\n                          \"title\": \"String\",\n                          \"positionPhotosphere\": \"String\",\n                          \"positionFlorplan\": \"String\",\n                          \"embedded\" : \n                              {\n                                  \"pano\": \"Array\"\n                              },\n                          \"links\": \n                              {\n                                  \"self\": \n                                      {\n                                          \"href\": \"String\"\n                                      }\n                              }\n                     },\n                 ]    \n         },\n         \"links\" : \n             {\n                  \"first\" : \"String\",\n                  \"last\" : \"String\",\n                  \"next\" : \"String\",\n                  \"prev\" : \"String\",\n                  \"self\" : \"String\"\n             },\n         \"page\" : \"Number\",\n         \"pageLimit\" : \"Number\",\n         \"total\" : \"Number\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"POVLinkNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "POVLink"
  },
  {
    "type": "put",
    "url": "/povLinks/:id",
    "title": "update povLinks.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/povLinks/:id"
      }
    ],
    "version": "0.1.0",
    "name": "updatePOVLinks",
    "group": "POVLink",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "id",
            "description": "<p>id of the pano (Required).</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "title",
            "description": "<p>title of the povLink (Required).</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "positionPhotosphere",
            "description": "<p>positionPhotosphere of the povLink (Required).</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "positionFlorplan",
            "description": "<p>positionFlorplan the povLink.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "pano",
            "description": "<p>ref to pano entity of the pano.</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 200 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "POVLinksNotFound",
            "description": "<p>The id of the POVLink was not found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"POVLinkNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "POVLink"
  },
  {
    "type": "post",
    "url": "/panoInfoElements",
    "title": "create panoInfoElements.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/panoInfoElements"
      }
    ],
    "version": "0.1.0",
    "name": "createPanoInfoElements",
    "group": "PanoInfoElements",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "title",
            "description": "<p>title of the panoInfoElements (Required).</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "description",
            "description": "<p>description of the panoInfoElements (Required).</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "positionPane",
            "description": "<p>position  of pane  the panoInfoElements.</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 0 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"links\" :\n       {\n            \"self\" : \n                {\n                     \"href\": \"String\"    \t\n                } \n       },\n  \"id\": \"String\",\n  \"title\": \"String\",\n  \"description\": \"String\",\n  \"positionPane\": \"String\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"panoInfoElementsNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "PanoInfoElements"
  },
  {
    "type": "del",
    "url": "/addresses/:id",
    "title": "delete panoInfoElement.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/panoInfoElements"
      }
    ],
    "version": "0.1.0",
    "name": "deletePanoInfoElements",
    "group": "PanoInfoElements",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "id",
            "description": "<p>id of the panoInfoElements (Required).</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 0 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "fileNotFound",
            "description": "<p>The id of the panoInfoElements was not found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"panoInfoElementsNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "PanoInfoElements"
  },
  {
    "type": "get",
    "url": "/panoInfoElements/:id",
    "title": "get one panoInfoElement by id.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/panoInfoElements/:id"
      }
    ],
    "version": "0.1.0",
    "name": "getPanoInfoElement",
    "group": "PanoInfoElements",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 200 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"links\" :\n       {\n            \"self\" : \n                {\n                     \"href\": \"String\"    \t\n                } \n       },\n  \"title\": \"String\",\n  \"description\": \"String\",\n  \"positionPane\": \"String\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"panoInfoElementsNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "PanoInfoElements"
  },
  {
    "type": "get",
    "url": "/panoInfoElements",
    "title": "get all panoInfoElements.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/panoInfoElements"
      }
    ],
    "version": "0.1.0",
    "name": "get_all_panoInfoElements",
    "group": "PanoInfoElements",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 200 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"links\": \n         {\n             \"self\": \n                 {\n                     \"href\": \"String\"\n                 }\n         },\n     \"embedded\": \n         {\n             \"panoInfoElements\": \n                 [\n                     {\n                          \"title\": \"String\",\n                          \"description\": \"String\",\n                          \"positionPane\": \"String\"\n                     },\n                 ]    \n         },\n         \"links\" : \n             {\n                  \"first\" : \"String\",\n                  \"last\" : \"String\",\n                  \"next\" : \"String\",\n                  \"prev\" : \"String\",\n                  \"self\" : \"String\"\n             },\n         \"page\" : \"Number\",\n         \"pageLimit\" : \"Number\",\n         \"total\" : \"Number\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"panoInfoElementsNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "PanoInfoElements"
  },
  {
    "type": "put",
    "url": "/panoInfoElements/:id",
    "title": "update panoInfoElement.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/panoInfoElements"
      }
    ],
    "version": "0.1.0",
    "name": "updatePanoInfoElements",
    "group": "PanoInfoElements",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "id",
            "description": "<p>id of the panoInfoElements (Required).</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 0 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "panoInfoElementsNotFound",
            "description": "<p>The id of the panoInfoElements was not found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"panoInfoElementsNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "PanoInfoElements"
  },
  {
    "type": "post",
    "url": "/panos",
    "title": "create pano.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/panos"
      }
    ],
    "version": "0.1.0",
    "name": "createPano",
    "group": "Pano",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the pano (Required).</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "locationURL",
            "description": "<p>location of the pano (Required).</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "povLinks",
            "description": "<p>ref to point of view  of the pano.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "panoInfoElemts",
            "description": "<p>ref to panoInfoElemnts entity of the pano.</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 0 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"links\" :\n       {\n            \"self\" : \n                {\n                     \"href\": \"String\"    \t\n                } \n       },\n  \"id\": \"String\",\n  \"name\": \"String\",\n  \"locationURL\": \"String\",\n  \"embedded\" : \n      {\n          \"povLinks\": \"Array\",\n          \"panoInfoElemts\": \"Array\"     \n      }      \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"TourNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "Pano"
  },
  {
    "type": "delete",
    "url": "/panos/:id",
    "title": "delete pano.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/panos/:id"
      }
    ],
    "version": "0.1.0",
    "name": "deletePano",
    "group": "Pano",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "id",
            "description": "<p>id of the Pano (Required).</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 0 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PanoNotFound",
            "description": "<p>The id of the Pano was not found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"PanoNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "Pano"
  },
  {
    "type": "get",
    "url": "/panos/:id",
    "title": "get pano - get one pano by id.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/panos/:id"
      }
    ],
    "version": "0.1.0",
    "name": "getPano",
    "group": "Pano",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 200 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"links\" :\n       {\n            \"self\" : \n                {\n                     \"href\": \"String\"    \t\n                } \n       },\n  \"name\": \"String\",\n  \"locationURL\": \"String\",\n  \"embedded\" : \n      {\n          \"povLinks\": \"Array\",\n          \"panoInfoElemts\": \"Array\"     \n      }      \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"TourNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "Pano"
  },
  {
    "type": "get",
    "url": "/panos",
    "title": "panos - get all panos.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/panos"
      }
    ],
    "version": "0.1.0",
    "name": "pano",
    "group": "Pano",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 200 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"links\": \n         {\n             \"self\": \n                 {\n                     \"href\": \"http://localhost:8080/panos\"\n                 }\n         },\n     \"embedded\": \n         {\n             \"panos\": \n                 [\n                     {\n                          \"name\": \"String\",\n                          \"locationURL\": \"String\",\n                          \"embedded\" : \n                              {\n                                  \"povLinks\": \"Array\",\n                                  \"panoInfoElemts\": \"Array\"     \n                              },\n                          \"links\": \n                              {\n                                  \"self\": \n                                      {\n                                          \"href\": \"String\"\n                                      }\n                              }\n                     },\n                 ]    \n         },\n         \"links\" : \n             {\n                  \"first\" : \"String\",\n                  \"last\" : \"String\",\n                  \"next\" : \"String\",\n                  \"prev\" : \"String\",\n                  \"self\" : \"String\"\n             },\n         \"page\" : \"Number\",\n         \"pageLimit\" : \"Number\",\n         \"total\" : \"Number\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"TourNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "Pano"
  },
  {
    "type": "put",
    "url": "/panos/:id",
    "title": "update pano.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/panos/"
      }
    ],
    "version": "0.1.0",
    "name": "updatePano",
    "group": "Pano",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "id",
            "description": "<p>id of the pano (Required).</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the tour (Required).</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "locationURL",
            "description": "<p>location of the pano (Required).</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "povLinks",
            "description": "<p>ref to point of view  of the pano.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "panoInfoElemts",
            "description": "<p>ref to panoInfoElemnts entity of the pano.</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 200 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PanoNotFound",
            "description": "<p>The id of the Pano was not found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"PanoNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "Pano"
  },
  {
    "type": "post",
    "url": "/tours",
    "title": "create tour.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/tours"
      }
    ],
    "version": "0.1.0",
    "name": "createTour",
    "group": "Tour",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the tour (Required).</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the tour (Required).</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "location",
            "description": "<p>Location of the tour (Required).</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "type",
            "description": "<p>Type of the Tour (Required).</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Date</p> ",
            "optional": false,
            "field": "createdDate",
            "description": "<p>Create date of the Tour (Required).</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "pano",
            "description": "<p>Photosphere entity ref of the Tour.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "image",
            "description": "<p>image entity ref of the Tour.</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 0 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"links\" :\n       {\n            \"self\" : \n                {\n                     \"href\": \"String\"    \t\n                } \n       },\n  \"id\": \"String\",\n  \"name\": \"String\",\n  \"description\": \"String\",\n  \"location\": \"String\",\n  \"type\": \"Boolean\",\n  \"createdDate\": \"Date\",\n  \"embedded\" : \n      {\n          \"panos\": \"Array\",\n          \"images\": \"Array\"     \n      }      \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"TourNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "Tour"
  },
  {
    "type": "delete",
    "url": "/tours/:id",
    "title": "delete tour.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/tours/:id"
      }
    ],
    "version": "0.1.0",
    "name": "deleteTour",
    "group": "Tour",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "id",
            "description": "<p>id of the Tour (Required).</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 0 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TourNotFound",
            "description": "<p>The id of the Tour was not found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "Tour"
  },
  {
    "type": "get",
    "url": "/tours/:id",
    "title": "get tour - get one tour by id.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/tours/:id"
      }
    ],
    "version": "0.1.0",
    "name": "getTour",
    "group": "Tour",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 200 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"links\" :\n       {\n            \"self\" : \n                {\n                     \"href\": \"String\"    \t\n                } \n       },\n  \"name\": \"String\",\n  \"description\": \"String\",\n  \"location\": \"String\",\n  \"type\": \"Boolean\",\n  \"createdDate\": \"Date\",\n  \"embedded\" : \n      {\n          \"panos\": \"Array\",\n          \"images\": \"Array\"     \n      }      \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"TourNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "Tour"
  },
  {
    "type": "get",
    "url": "/tours",
    "title": "tours - get all tours.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/tours"
      }
    ],
    "version": "0.1.0",
    "name": "tours",
    "group": "Tour",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 200 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"links\": \n         {\n             \"self\": \n                 {\n                     \"href\": \"String\"\n                 }\n         },\n     \"embedded\": \n         {\n             \"tours\": \n                 [\n                     {\n                          \"name\": \"String\",\n                          \"description\": \"String\",\n                          \"location\": \"String\",\n                          \"type\": \"Boolean\",\n                          \"createdDate\": \"Date\",\n                          \"embedded\" : \n                              {\n                                  \"panos\": \"Array\",\n                                  \"images\": \"Array\"     \n                              },\n                          \"links\": \n                              {\n                                  \"self\": \n                                      {\n                                          \"href\": \"String\"\n                                      }\n                              }\n                     },\n                 ]    \n         },\n         \"links\" : \n             {\n                  \"first\" : \"String\",\n                  \"last\" : \"String\",\n                  \"next\" : \"String\",\n                  \"prev\" : \"String\",\n                  \"self\" : \"String\"\n             },\n         \"page\" : \"Number\",\n         \"pageLimit\" : \"Number\",\n         \"total\" : \"Number\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"TourNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "Tour"
  },
  {
    "type": "put",
    "url": "/tours/:id",
    "title": "update tour.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/tours/"
      }
    ],
    "version": "0.1.0",
    "name": "updateTour",
    "group": "Tour",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "id",
            "description": "<p>id of the tour (Required).</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the tour (Required).</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the tour (Required).</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "location",
            "description": "<p>Location of the tour (Required).</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "type",
            "description": "<p>Type of the Tour (Required).</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Date</p> ",
            "optional": false,
            "field": "createdDate",
            "description": "<p>Create date of the Tour (Required).</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "photosphereId",
            "description": "<p>Photosphere entity ref of the Tour (Required).</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "imagesId",
            "description": "<p>image entity ref of the Tour (Required).</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 200 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TourNotFound",
            "description": "<p>The id of the Tour was not found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"TourNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "Tour"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "create user.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/users"
      }
    ],
    "version": "0.1.0",
    "name": "createUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the User (Required).</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "lastName",
            "description": "<p>LastName of the User (Required).</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "userName",
            "description": "<p>UserName of the User (Required).</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "email",
            "description": "<p>email of the User (Required).</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "password",
            "description": "<p>of the User (Required).</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "avatar",
            "description": "<p>Avatar of the User.</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 0 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"links\" :\n       {\n            \"self\" : \n                {\n                     \"href\": \"String\"    \t\n                } \n       },      \n       \"email\" : \"String\",\n       \"id\" : \"String\",\n       \"name\" : \"String\",\n       \"lastName\" : \"String\",\n       \"userName\" : \"String\",\n       \"avatar\" : \"String\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "delete user.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/users/:id"
      }
    ],
    "version": "0.1.0",
    "name": "deleteUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "id",
            "description": "<p>id of the User (Required).</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 0 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "get one  user by Id.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/users/:id"
      }
    ],
    "version": "0.1.0",
    "name": "getUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the User.</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 0 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"links\" :\n       {\n            \"self\" : \n                {\n                     \"href\": \"String\"    \t\n                } \n       },      \n       \"email\" : \"String\",\n       \"id\" : \"String\",\n       \"name\" : \"String\",\n       \"lastName\" : \"String\",\n       \"userName\" : \"String\",\n       \"avatar\" : \"String\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/",
    "title": "get all users.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/users"
      }
    ],
    "version": "0.1.0",
    "name": "getUsers",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 0 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"embedded\": \n      {\n       \"users\":\n       {\n           [\n               \"0\": \n                   {\n                        \"links\" : \n                           {\n                               \"self\" : \n                                   {\n                                       \"href\": \"String\"\t\n                                   } \t\n                            },\n                        \"email\" : \"String\",\n                        \"id\" : \"String\",\n                        \"name\" : \"String\",\n                        \"lastName\" : \"String\",\n                        \"userName\" : \"String\",\n                        \"avatar\" : \"String\"\n                   }\t\n            ]\n       }\n    },\n    \"links\" : \n         {\n          \"first\" : \"String\",\n          \"last\" : \"String\",\n          \"next\" : \"String\",\n          \"prev\" : \"String\",\n          \"self\" : \"String\"\n         }\n\n  \"page\" : \"Number\",\n  \"pageLimit\" : \"Number\",\n  \"total\" : \"Number\",\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>Number</p> ",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>page of the pagination.</p> "
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/users/:id",
    "title": "update user.",
    "sampleRequest": [
      {
        "url": "http://virtualitour.jortech.com.ve/users/"
      }
    ],
    "version": "0.1.0",
    "name": "updateUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "id",
            "description": "<p>id of the User (Required).</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the User.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "lastName",
            "description": "<p>LastName of the User.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "userName",
            "description": "<p>UserName of the User.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "email",
            "description": "<p>email of the User.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "password",
            "description": "<p>of the User.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "avatar",
            "description": "<p>Avatar of the User.</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>Código 200 good.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/v1/route.js",
    "groupTitle": "User"
  }
] });