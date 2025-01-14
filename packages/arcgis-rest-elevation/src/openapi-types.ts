/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/elevation/at-point": {
    /**
     * Returns the elevation in meters at a given longitude and latitude within the WGS84 coordinate system.
     *
     * By default the elevation is measured with respect to the Earth's mean sea level. It takes into account the local variations in gravity and provides a consistent vertical reference.
     *
     * If the `relativeTo` query parameter is set to `ellipsoid`, the elevation will be measured with respect to the ellipsoid. This is a mathematical model that approximates the shape of the Earth. It does not consider local variations in gravity and is commonly used in GPS positioning.
     *
     * Note: You cannot permanently store elevations. Please see the [Terms of use](https://developers.arcgis.com/documentation/mapping-apis-and-services/deployment/terms-of-use/).
     */
    get: operations["ElevationAtPointGet"];
  };
  "/elevation/at-many-points": {
    /**
     * Returns elevations in meters at given longitudes and latitudes within the WGS84 coordinate system.
     *
     * The order of the points returned by this request will be the same as the order of the points passed in the
     * `coordinates` parameter.
     *
     * If the distance between the furthest West and furthest East coordinate exceeds 50km, the service will return a `400` HTTP response as the distance between these points is too large.
     *
     * If the distance between the furthest North and furthest South coordinate exceeds 50km, the service will return a `400` HTTP response as the distance between these points is too large.
     *
     * If any of the points are otherwise invalid, a `400` HTTP response will be returned.
     *
     * By default the elevation is measured with respect to the Earth's mean sea level. It takes into account the local variations in gravity and provides a consistent vertical reference.
     *
     * If the `relativeTo` parameter in the body is set to `ellipsoid`, the elevation will be measured with respect to the ellipsoid. This is a mathematical model that approximates the shape of the Earth. It does not consider local variations in gravity and is commonly used in GPS positioning.
     *
     * Note: You cannot permanently store elevations. Please see the [Terms of use](https://developers.arcgis.com/documentation/mapping-apis-and-services/deployment/terms-of-use/).
     *
     * The Post Body content type must be either:
     * - JSON with content type of `application/json`, or
     * - form URL encoded key-value pairs with content type `application/x-www-form-urlencoded`.
     *
     * The following parameters are used to fetch elevations for multiple coordinates:
     *
     * **coordinates**
     *   - (Required) Array of (longitude, latitude) pairs in the WGS84 spatial reference. Maximum size of 100 coordinates. The order of each pair must be
     *     - longitude in the range `-179.99` to `179.99` representing the east/west or x-axis
     *     - latitude in the range `-85.05` to `85.05` representing the north/south or y-axis
     *   - For example: `[[31.134167, 29.979167], [31.130833, 29.976111], [31.128333, 29.9725]]`
     *
     * **f**
     *   - (Optional) Case-sensitive parameter to specify the format in which responses are given. Can either be `json` or `pjson`.
     *
     * **relativeTo**
     *   - (Optional) The reference position (datum) from which to measure elevation. The valid values are:
     *
     *     - **meanSeaLevel**: The elevation above or below the WGS84 geoid reference surface, which is approximately the mean sea level. It takes into account the local variations in gravity and provides a consistent vertical reference.
     *     - **ellipsoid**: Ellipsoidal height is measured with respect to an ellipsoid, which is a mathematical model that approximates the shape of the Earth. It does not consider local variations in gravity and is commonly used in GPS positioning.
     *
     * **token**
     *   - (Optional) The authentication token, used to access the elevation service. Alternatively, you can supply a token in the request header with either the `Authorization` or `X-Esri-Authorization` key, using the "Bearer" scheme.
     */
    post: operations["ElevationAtManyPointsPost"];
  };
}

export interface components {
  schemas: {
    /** @description A geometry point referring to a location on a map. */
    Point: {
      /** @description The spatial reference system the point is relative to. */
      spatialReference: {
        /**
         * @description The Well-Known ID (WKID) value of the spatial reference.
         * @example 4326
         */
        wkid: number;
      };
      /**
       * @description The X coordinate which is measured along the east/west axis.
       * @example 86.925278
       */
      x: number;
      /**
       * @description The Y coordinate which is measured along the north/south axis.
       * @example 27.988333
       */
      y: number;
      /**
       * @description The Z coordinate represents the vertical position of a point above or below a reference level, such as sea level (in meters, rounded to the nearest meter).
       * @example 8744
       */
      z: number;
    };
    /** @description A structure containing human readable metadata about the specified point. */
    ElevationInfo: {
      /**
       * @description The reference position (datum) from which to measure elevation.
       * The valid values are:
       * - meanSeaLevel: The elevation above or below the WGS84 geoid reference surface, which is approximately the mean sea level.
       *                 It takes into account the local variations in gravity and provides a consistent vertical reference.
       * - ellipsoid: Ellipsoidal height is measured with respect to an ellipsoid, which is a mathematical model that approximates the shape of the Earth.
       *               It does not consider local variations in gravity and is commonly used in GPS positioning.
       *
       * @default meanSeaLevel
       * @example meanSeaLevel
       * @enum {string}
       */
      relativeTo: "meanSeaLevel" | "ellipsoid";
    };
    /** @description A structure containing a point including an elevation value (defined as Z). */
    Elevation: {
      /** @description The point containing the elevation. */
      point: components["schemas"]["Point"];
    };
    /**
     * @description A structure containing a collection of points which contain elevation values (defined as Z). When returned from
     * a request to the `/elevation/at-many-points` endpoint, the order of the points will match the order of the
     * points in the request.
     */
    Elevations: {
      points: components["schemas"]["Point"][];
    };
    Error: {
      /** @description Error information */
      error: {
        /**
         * @description A code identifying the type of error, either an HTTP error code, `498` (signifying invalid or expired token), or `499` (signifying missing token).
         * @example 400
         * @enum {integer}
         */
        code: 400 | 401 | 403 | 404 | 413 | 415 | 498 | 499 | 500;
        /** @description A message describing the error. */
        message: string;
        /** @description List of details about the error. */
        details?: string[];
        /**
         * @description URL that provides the elevation service information.
         * @example https://elevation-api.arcgis.com/arcgis/rest/info
         */
        restInfoUrl?: string;
      };
    };
    /**
     * @description Optional, case-sensitive parameter to specify the format in which responses are given. Can either be `json` or `pjson`.
     * @enum {string}
     */
    Format: "json" | "pjson";
  };
  responses: {
    /** Response to a request for the elevation at a specified point. */
    ElevationResponse: {
      content: {
        "application/json": {
          elevationInfo: components["schemas"]["ElevationInfo"];
          result: components["schemas"]["Elevation"];
        };
      };
    };
    /**
     * Response to a request for the elevations at specified points. There will be one response point for each point
     * in the request. The order of these points will match the order of the points in the request.
     */
    MultipleElevationsResponse: {
      content: {
        "application/json": {
          elevationInfo: components["schemas"]["ElevationInfo"];
          result: components["schemas"]["Elevations"];
        };
      };
    };
    /** Authentication Error. The API key or token is missing, invalid or expired. */
    UnauthorizedErrorResponse: {
      content: {
        "application/json": components["schemas"]["Error"];
      };
    };
    /** An error occurred on the server. */
    ServerErrorResponse: {
      content: {
        "application/json": components["schemas"]["Error"];
      };
    };
    /** Invalid query parameters / Incorrect portal item type. */
    InvalidQueryErrorResponse: {
      content: {
        "application/json": components["schemas"]["Error"];
      };
    };
    /** The supplied authentication information is valid but does not have permission to access the service. */
    PermissionMissingErrorResponse: {
      content: {
        "application/json": components["schemas"]["Error"];
      };
    };
    /** The requested resource cannot be accessed because of incorrect sharing permissions. */
    ResourcePermissionErrorResponse: {
      content: {
        "application/json": components["schemas"]["Error"];
      };
    };
    /** The request body was larger than limits defined by the service. */
    ContentTooLargeErrorResponse: {
      content: {
        "application/json": components["schemas"]["Error"];
      };
    };
    /** The request's message content is of a media-type that the service does not support. */
    UnsupportedMediaTypeErrorResponse: {
      content: {
        "application/json": components["schemas"]["Error"];
      };
    };
  };
  parameters: {
    /** @description Optional, case-sensitive parameter to specify the format in which responses are given. Can either be `json` or `pjson`. */
    FormatParam: components["schemas"]["Format"];
    /**
     * @description The authentication token, used to access the elevation service.
     *
     * The `token` parameter can be either an API Key or short-lived token.
     *
     * Alternatively, you can supply a token in the request header with one of
     * the following keys using the "Bearer" scheme:
     *
     * - `Authorization: Bearer <YOUR_TOKEN>`
     * - `X-Esri-Authorization: Bearer <YOUR_TOKEN>`
     *
     * The provided `token` must be created from an ArcGIS Location Platform account and have the necessary `premium:user:elevation` privilege to use the elevation service.
     *
     * **Developer guide**: To learn more, go to [Security and authentication](https://developers.arcgis.com/documentation/mapping-apis-and-services/security/).
     */
    TokenParam: string;
    /** @description The longitude of the specified point. */
    LongitudeParam: number;
    /** @description The latitude of the specified point. */
    LatitudeParam: number;
    /**
     * @description The reference position (datum) from which to measure elevation.
     * The valid values are:
     * - meanSeaLevel: The elevation above or below the WGS84 geoid reference surface, which is approximately the mean sea level.
     *                 It takes into account the local variations in gravity and provides a consistent vertical reference.
     * - ellipsoid: Ellipsoidal height is measured with respect to an ellipsoid, which is a mathematical model that approximates the shape of the Earth.
     *               It does not consider local variations in gravity and is commonly used in GPS positioning.
     */
    RelativeToParam: "meanSeaLevel" | "ellipsoid";
  };
}

export interface operations {
  /**
   * Returns the elevation in meters at a given longitude and latitude within the WGS84 coordinate system.
   *
   * By default the elevation is measured with respect to the Earth's mean sea level. It takes into account the local variations in gravity and provides a consistent vertical reference.
   *
   * If the `relativeTo` query parameter is set to `ellipsoid`, the elevation will be measured with respect to the ellipsoid. This is a mathematical model that approximates the shape of the Earth. It does not consider local variations in gravity and is commonly used in GPS positioning.
   *
   * Note: You cannot permanently store elevations. Please see the [Terms of use](https://developers.arcgis.com/documentation/mapping-apis-and-services/deployment/terms-of-use/).
   */
  ElevationAtPointGet: {
    parameters: {
      query: {
        /** The longitude of the specified point. */
        lon: components["parameters"]["LongitudeParam"];
        /** The latitude of the specified point. */
        lat: components["parameters"]["LatitudeParam"];
        /**
         * The reference position (datum) from which to measure elevation.
         * The valid values are:
         * - meanSeaLevel: The elevation above or below the WGS84 geoid reference surface, which is approximately the mean sea level.
         *                 It takes into account the local variations in gravity and provides a consistent vertical reference.
         * - ellipsoid: Ellipsoidal height is measured with respect to an ellipsoid, which is a mathematical model that approximates the shape of the Earth.
         *               It does not consider local variations in gravity and is commonly used in GPS positioning.
         */
        relativeTo?: components["parameters"]["RelativeToParam"];
        /**
         * The authentication token, used to access the elevation service.
         *
         * The `token` parameter can be either an API Key or short-lived token.
         *
         * Alternatively, you can supply a token in the request header with one of
         * the following keys using the "Bearer" scheme:
         *
         * - `Authorization: Bearer <YOUR_TOKEN>`
         * - `X-Esri-Authorization: Bearer <YOUR_TOKEN>`
         *
         * The provided `token` must be created from an ArcGIS Location Platform account and have the necessary `premium:user:elevation` privilege to use the elevation service.
         *
         * **Developer guide**: To learn more, go to [Security and authentication](https://developers.arcgis.com/documentation/mapping-apis-and-services/security/).
         */
        token?: components["parameters"]["TokenParam"];
        /** Optional, case-sensitive parameter to specify the format in which responses are given. Can either be `json` or `pjson`. */
        f?: components["parameters"]["FormatParam"];
      };
    };
    responses: {
      200: components["responses"]["ElevationResponse"];
      400: components["responses"]["InvalidQueryErrorResponse"];
      401: components["responses"]["UnauthorizedErrorResponse"];
      403: components["responses"]["ResourcePermissionErrorResponse"];
      "5XX": components["responses"]["ServerErrorResponse"];
    };
  };
  /**
   * Returns elevations in meters at given longitudes and latitudes within the WGS84 coordinate system.
   *
   * The order of the points returned by this request will be the same as the order of the points passed in the
   * `coordinates` parameter.
   *
   * If the distance between the furthest West and furthest East coordinate exceeds 50km, the service will return a `400` HTTP response as the distance between these points is too large.
   *
   * If the distance between the furthest North and furthest South coordinate exceeds 50km, the service will return a `400` HTTP response as the distance between these points is too large.
   *
   * If any of the points are otherwise invalid, a `400` HTTP response will be returned.
   *
   * By default the elevation is measured with respect to the Earth's mean sea level. It takes into account the local variations in gravity and provides a consistent vertical reference.
   *
   * If the `relativeTo` parameter in the body is set to `ellipsoid`, the elevation will be measured with respect to the ellipsoid. This is a mathematical model that approximates the shape of the Earth. It does not consider local variations in gravity and is commonly used in GPS positioning.
   *
   * Note: You cannot permanently store elevations. Please see the [Terms of use](https://developers.arcgis.com/documentation/mapping-apis-and-services/deployment/terms-of-use/).
   *
   * The Post Body content type must be either:
   * - JSON with content type of `application/json`, or
   * - form URL encoded key-value pairs with content type `application/x-www-form-urlencoded`.
   *
   * The following parameters are used to fetch elevations for multiple coordinates:
   *
   * **coordinates**
   *   - (Required) Array of (longitude, latitude) pairs in the WGS84 spatial reference. Maximum size of 100 coordinates. The order of each pair must be
   *     - longitude in the range `-179.99` to `179.99` representing the east/west or x-axis
   *     - latitude in the range `-85.05` to `85.05` representing the north/south or y-axis
   *   - For example: `[[31.134167, 29.979167], [31.130833, 29.976111], [31.128333, 29.9725]]`
   *
   * **f**
   *   - (Optional) Case-sensitive parameter to specify the format in which responses are given. Can either be `json` or `pjson`.
   *
   * **relativeTo**
   *   - (Optional) The reference position (datum) from which to measure elevation. The valid values are:
   *
   *     - **meanSeaLevel**: The elevation above or below the WGS84 geoid reference surface, which is approximately the mean sea level. It takes into account the local variations in gravity and provides a consistent vertical reference.
   *     - **ellipsoid**: Ellipsoidal height is measured with respect to an ellipsoid, which is a mathematical model that approximates the shape of the Earth. It does not consider local variations in gravity and is commonly used in GPS positioning.
   *
   * **token**
   *   - (Optional) The authentication token, used to access the elevation service. Alternatively, you can supply a token in the request header with either the `Authorization` or `X-Esri-Authorization` key, using the "Bearer" scheme.
   */
  ElevationAtManyPointsPost: {
    responses: {
      200: components["responses"]["MultipleElevationsResponse"];
      400: components["responses"]["InvalidQueryErrorResponse"];
      401: components["responses"]["UnauthorizedErrorResponse"];
      403: components["responses"]["ResourcePermissionErrorResponse"];
      413: components["responses"]["ContentTooLargeErrorResponse"];
      415: components["responses"]["UnsupportedMediaTypeErrorResponse"];
      "5XX": components["responses"]["ServerErrorResponse"];
    };
    requestBody: {
      content: {
        "application/json": {
          /**
           * @description The authentication token, used to access the elevation service.
           *
           * The `token` parameter can be either an API Key or short-lived token.
           *
           * Alternatively, you can supply a token in the request header with one of
           * the following keys using the "Bearer" scheme:
           *
           * - `Authorization: Bearer <YOUR_TOKEN>`
           * - `X-Esri-Authorization: Bearer <YOUR_TOKEN>`
           *
           * The provided `token` must be created from an ArcGIS Location Platform account and have the necessary `premium:user:elevation` privilege to use the elevation service.
           *
           * **Developer guide**: To learn more, go to [Security and authentication](https://developers.arcgis.com/documentation/security-and-authentication/).
           *
           * @example My token
           */
          token?: string;
          /**
           * @description The reference position (datum) from which to measure elevation.
           * The valid values are:
           * - meanSeaLevel: The elevation above or below the WGS84 geoid reference surface, which is approximately the mean sea level.
           *                 It takes into account the local variations in gravity and provides a consistent vertical reference.
           * - ellipsoid: Ellipsoidal height is measured with respect to an ellipsoid, which is a mathematical model that approximates the shape of the Earth.
           *               It does not consider local variations in gravity and is commonly used in GPS positioning.
           *
           * @default meanSeaLevel
           * @example meanSeaLevel
           * @enum {string}
           */
          relativeTo?: "meanSeaLevel" | "ellipsoid";
          f?: components["schemas"]["Format"];
          /**
           * @description Array of (longitude, latitude) pairs in the WGS84 spatial reference. Maximum size of 100 coordinates. The order of each pair must be
           *   - longitude in the range `-179.99` to `179.99` representing the east/west or x-axis
           *   - latitude in the range `-85.05` to `85.05` representing the north/south or y-axis
           *
           * For example: `[[31.134167, 29.979167], [31.130833, 29.976111], [31.128333, 29.9725]]`
           *
           * @example [
           *   [
           *     31.134167,
           *     29.979167
           *   ],
           *   [
           *     31.130833,
           *     29.976111
           *   ],
           *   [
           *     31.128333,
           *     29.9725
           *   ]
           * ]
           */
          coordinates: number[][];
        };
        "application/x-www-form-urlencoded": {
          /**
           * @description The authentication token, used to access the elevation service.
           *
           * The `token` parameter can be either an API Key or short-lived token.
           *
           * Alternatively, you can supply a token in the request header with one of
           * the following keys using the "Bearer" scheme:
           *
           * - `Authorization: Bearer <YOUR_TOKEN>`
           * - `X-Esri-Authorization: Bearer <YOUR_TOKEN>`
           *
           * The provided `token` must be created from an ArcGIS Location Platform account and have the necessary `premium:user:elevation` privilege to use the elevation service.
           *
           * **Developer guide**: To learn more, go to [Security and authentication](https://developers.arcgis.com/documentation/security-and-authentication/).
           *
           * @example My token
           */
          token?: string;
          /**
           * @description The reference position (datum) from which to measure elevation.
           * The valid values are:
           * - meanSeaLevel: The elevation above or below the WGS84 geoid reference surface, which is approximately the mean sea level.
           *                 It takes into account the local variations in gravity and provides a consistent vertical reference.
           * - ellipsoid: Ellipsoidal height is measured with respect to an ellipsoid, which is a mathematical model that approximates the shape of the Earth.
           *               It does not consider local variations in gravity and is commonly used in GPS positioning.
           *
           * @default meanSeaLevel
           * @example meanSeaLevel
           * @enum {string}
           */
          relativeTo?: "meanSeaLevel" | "ellipsoid";
          f?: components["schemas"]["Format"];
          /**
           * @description Array of (longitude, latitude) pairs in the WGS84 spatial reference. Maximum size of 100 coordinates. The order of each pair must be
           *   - longitude in the range `-179.99` to `179.99` representing the east/west or x-axis
           *   - latitude in the range `-85.05` to `85.05` representing the north/south or y-axis
           *
           * For example: `[[31.134167, 29.979167], [31.130833, 29.976111], [31.128333, 29.9725]]`
           *
           * @example [
           *   [
           *     31.134167,
           *     29.979167
           *   ],
           *   [
           *     31.130833,
           *     29.976111
           *   ],
           *   [
           *     31.128333,
           *     29.9725
           *   ]
           * ]
           */
          coordinates: number[][];
        };
      };
    };
  };
}

export interface external {}
