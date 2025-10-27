/**
 * Type definitions to interact with Kuula Player API.
 *
 * @module
 */

/**
 * Structure of Kuula Posts.
 */
export type KuulaPost = {
  /** 
   * Unique identifier of the post
   */
  id: string;
  /** 
   * Title of the post (can be empty)
   */
  title: string;
  /**
   * Post description, it usually matches the post title (can be empty)
   */
  description: string;
  /**
   * Post cover image URL, used to display in the Kuula platform
   */
  cover: string;
};

/**
 * Structure of Kuula Tours.
 */
export type KuulaTour = {
  /**
   * Unique identifier of the tour
   */
  id: string;
  /** 
   * Name of the tour
   */
  name: string;
  /**
   * A brief description of the tour (can be empty)
   */
  description: string;
  excludes: string[];
  plans: string[];
};

/**
 * Function dispatched when a Frame is loaded.
 */
export type FrameLoadedFunction = (event: FrameLoadedEvent) => void;

/**
 * Event received when a Frame is loaded.
 */
export type FrameLoadedEvent = {
  frame: number;
  data: {
    posts: KuulaPost[];
    tour: KuulaTour;
  };
  element: HTMLIFrameElement;
};

/**
 * Function dispatched when a Post is loaded.
 */
export type PostLoadedFunction = (event: PostLoadedEvent) => void;

/**
 * Event received when a Post is loaded.
 */
export type PostLoadedEvent = {
  frame: number;
  data: Omit<KuulaPost, "cover">;
};

/**
 * Function dispatched when a Frame orientation changes or every 300ms.
 */
export type OrientationFunction = (event: OrientationEvent) => void;

/**
 * Event received when Frame orientation changes.
 */
export type OrientationEvent = {
  frame: number;
  data: {
    /**
     * Represents the angle of the camera left and right
     */
    heading: number;
    /**
     * Represents the angle of the camera up and down
     */
    pitch: number;
    /**
     * Current zoom level of the camera.
     */
    zoom: number;
    /**
     * Indicates if the frame is the focused element of the page
     */
    focus: boolean;
    /**
     * Container <iframe> ID
     */
    src: number;
  };
};

/**
 * Function dispatched when the user interacts with a Hotspot.
 */
export type HotspotFunction = (event: HotspotEvent) => void;

/**
 * Event received when a Hotspot is clicked.
 */
export type HotspotEvent = {
  frame: number;
  data: {
    uid: string;
    name?: string;
  };
};

/**
 * Function dispatched when the user closes a Card.
 */
export type CardClosedFunction = (event: CardClosedEvent) => void;

/**
 * Event received when a Card is closed.
 */
export type CardClosedEvent = {
  frame: number;
  data: unknown;
};

/**
 * @internal
 */
type EventCallbacks = {
  frameloaded: FrameLoadedFunction;
  hotspot: HotspotFunction;
  orientation: OrientationFunction;
  postloaded: PostLoadedFunction;
  cardclosed: CardClosedFunction;
};

/**
 * @internal
 */
type KuulaCallback<T extends keyof EventCallbacks> = EventCallbacks[T];

/**
 * Kuula Player API interface to interact with the Viewer.
 */
export type KuulaPlayerApi = {
  /**
   * Listen to events emitted by the Kuula Iframe.
   *
   * @param event - Name of the Kuula event
   * @param callback - Callback to perform on event handling
   */
  addEventListener: <T extends keyof EventCallbacks>(
    event: T,
    callback: KuulaCallback<T>,
  ) => void;
  /**
   * Remove event attached to a Kuula Iframe.
   *
   * @param event - Name of the Kuula event
   * @param callback - Callback to perform on event handling
   */
  removeEventListener: <T extends keyof EventCallbacks>(
    event: T,
    callback: KuulaCallback<T>,
  ) => void;
  /**
   * Load the given `postId` on the frame with `frameId`.
   *
   * @param frameId - ID of the target frame
   * @param postId - ID of the post to load
   */
  load: (frameId: number, postId: string) => void;
  /**
   * Set the viewer in the given `y` axis value.
   *
   * @param frameId - ID of the target frame
   * @param heading - Value of the `y` axis
   */
  setHeading: (frameId: number, heading: number) => void;
  /**
   * Set the viewer in the given `x` axis value.
   *
   * @param frameId - ID of the target frame
   * @param pitch - Value of the `x` axis
   */
  setPitch: (frameId: number, pitch: number) => void;
  /**
   * Set the viewer in the given `zoom` value.
   *
   * @param frameId - ID of the target frame
   * @param pitch - Value of the zoom
   */
  setZoom: (frameId: number, zoom: number) => void;
  /**
   * Add or update parameters on the target Hotspot.
   *
   * @param frameId - ID of the target frame
   * @param hotspotId - Target Hotspot on the frame
   * @param param - Param name to assign
   * @param value - Value to apply to the Param
   */
  setParam: (
    frameId: number,
    hotspotId: string,
    param: string,
    value: string,
  ) => void;
  /**
   * Orientate of the viewer to given `zoom`, `pitch` and `heading`.
   *
   * @param frameId - ID of the target frame
   * @param value - Values of `zoom`, `pitch` and `heading`
   */
  setOrientation: (
    frameId: number,
    value: Omit<OrientationEvent["data"], "src" | "focus">,
  ) => void;
  /**
   * Set autorotation on the given frame.
   *
   * @param frameId - ID of the target frame
   * @param autoRotate - Enable or disabled autorotation
   */
  setAutoRotate: (frameId: number, autoRotate: boolean | number) => void;
  /**
   * Close the active Card on the given Frame.
   *
   * @param frameId - ID of the target frame
   * @param event - DOM event triggered by the close action
   */
  closeCard: (frameId: number, event: Event) => void;
  /**
   * Manually trigger a click event on the given Hotspot.
   *
   * @param frameId - ID of the target frame
   * @param hotspotId - Unique identifier of the hotspot (Scripting ID value is also supported)
   */
  hotspotClick: (frameId: number, hotspotId: string) => void;
  /**
   * When more than one Kuula Frame exists, this function
   * can be used to synchronize movement between the two.
   *
   * @param sync - Weather to enable sync of disabled it
   */
  synchronizePlayers: (sync: boolean) => void;
  /**
   * @deprecated `onFrameLoaded` is deprecated, please use `addEventListener('frameloaded', callback)` instead.
   */
  onFrameLoaded: () => void;
  /**
   * @deprecated `onPostLoaded` is deprecated, please use `addEventListener('postloaded', callback)` instead.
   */
  onPostLoaded: () => void;
};

/**
 * Possible **share URL parameters** that Kuula can receive while requesting a Post/Tour via URL.
 *
 * `https://kuula.co/share/xxxxx?logo=0&info=0&fs=0&vr=0&zoom=1&sd=1&gyro=0&...`
 *
 * @example An example of URL constructor:
 * ```ts
 * const defaultOptions: Partial<KuulaURLParams> = {
 *   info: 0,
 *   fs: 0,
 *   vr: 0,
 *   gyro: 0,
 *   keys: 0,
 *   initload: 1,
 *   thumbs: -1,
 *   inst: 'es',
 * }
 *
 * let kuulaUrl = `https://kuula.co/share/xxxxx?`
 *
 * // Append parameters to the URL
 * for (const [key, value] of Object.entries(defaultOptions)) {
 *   kuulaUrl += '&' + key + '=' + value
 * }
 * ```
 */
export type KuulaURLParams = {
  /**
   * Speed in which the player will rotate automatically.
   *
   * Allowed values from `-1.5` to `1.5`
   */
  autorotate: number;
  /**
   * If autoplay is set to other than `0`, the tour will load the next image in regular intervals of the set value in seconds.
   */
  autop: number | 0;
  /**
   * If set to `1` and you set an autorotation speed (`autop`), this will change the direction of the rotation on each newly loaded post.
   *
   * So if the first post in the tour rotates left, the 2nd one will rotate right and the 3rd one, left again.
   */
  autopalt: 1 | 0;
  /**
   * Determine the behavior and visibility of the logo.
   * - `1`: Show logo with an external link.
   * - `0`: Show logo without an external link.
   * - `-1`: Hide logo.
   */
  logo: 1 | 0 | -1;
  /**
   * Size of the logo in `px`, only applicable if `logo` is set.
   */
  logosize: number;
  /**
   * Allows hiding the default logo or to use a custom brand logo.
   */
  chromeless: 1 | 0;
  /**
   * Show or hide information button.
   */
  info: 1 | 0;
  /**
   * Show or hide fullscreen button.
   */
  fs: 1 | 0;
  /**
   * Show or hide virtual reality button.
   */
  vr: 1 | 0;
  /**
   * Enables gyroscope on mobile devices.
   */
  gyro: 1 | 0;
  /**
   * Enable zoom using mouse wheel when embedded.
   */
  zoom: 1 | 0;
  /**
   * Automatically load the player instead of showing the play button.
   */
  initload: 1 | 0;
  /**
   * Show thumbnails, show dots or hide everything.
   *
   * - `-1` Removes thumbnails and dots.
   * - `0` Hides thumbnails but shows dots and arrows.
   * - `1` Shows thumbnails in dark mode.
   * - `2` Shows thumbnails in white mode.
   * - `3` Hide thumbnails in dark mode.
   * - `4` Hide thumbnails in white mode.
   */
  thumbs: -1 | 0 | 1 | 2 | 3 | 4;
  /**
   * Show or hide chip card with point information.
   */
  card: number;
  /**
   * Allow or deny keyboard shortcuts.
   */
  keys: 1 | 0;
  /**
   * Language to use on the information bar at the bottom of the player (0 to hide).
   */
  inst:
    | 0
    | "en"
    | "es"
    | "de"
    | "fr"
    | "it"
    | "nl"
    | "hu"
    | "pl"
    | "pt"
    | "ro"
    | "ru";
  /**
   * Enable image optimization for faster loading times.
   */
  sd: 1 | 0;
  /**
   * Mute all audio.
   */
  audio: 1 | 0;
  /**
   * Internal player interface margin in pixels.
   */
  margin: number;
  /**
   * Set the transparency of the player internal interface.
   */
  alpha: number;
};

/**
 * @internal
 */
type KuulaBaseMessage = {
  /**
   * Indicates if the event comes from kuula iframe
   */
  kuula: boolean;
  /**
   * UUID identifier of the iframe that triggered the event
   */
  uuid: number;
};

/**
 * MessageEvent data received from the iframe after it was loaded
 */
export type MessageFrameLoaded = KuulaBaseMessage & {
  cmd: "frameloaded";
  data: { posts: KuulaPost[]; tour: KuulaTour };
  /** 
   * The Kuula URL given to the iframe
   */
  src: string;
};

/**
 * MessageEvent data received from the post that just started loading
 */
export type MessageStart = KuulaBaseMessage & {
  cmd: "start";
  data: undefined;
};

/**
 * MessageEvent data received from the post that was processed but is not ready yet (image not loaded)
 */
export type MessagePostLoaded = KuulaBaseMessage & {
  cmd: "postloaded";
  data: Omit<KuulaPost, "cover">;
};

/**
 * MessageEvent data received from the post that just finished loading its image (ready for interaction)
 */
export type MessagePostReady = KuulaBaseMessage & {
  cmd: "postready";
  data: { id: string; user: string; tainted: boolean };
};

/**
 * MessageEvent data received from the post current orientation, this event is dispatched every 300ms
 */
export type MessageOrientation = KuulaBaseMessage & {
  cmd: "orientation";
  data: {
    /**
     * Represents the angle of the camera left and right
     */
    heading: number;
    /**
     * Represents the angle of the camera up and down
     */
    pitch: number;
    /**
     * Current zoom level of the camera.
     */
    zoom: number;
    /**
     * Indicates if the frame is the focused element of the page
     */
    focus: boolean;
    /**
     * Container <iframe> ID
     */
    src: number;
  };
};

/**
 * Type to handle received `MessageEvent` from Kuula iframe.
 *
 * Useful when you want to listen to events not listened in the main API.
 *
 * @example
 * ```ts
 * const postReady = (event: MessageEvent<KuulaMessageData>) => {
 *    if (event.origin === 'https://kuula.co' && event.data.cmd === 'postready') {
 *      // event.data is typed properly for 'postready' at this point
 *    }
 * }
 *
 * window.addEventListener('message', postReady)
 * ```
 */
export type KuulaMessageData =
  | MessageFrameLoaded
  | MessageStart
  | MessagePostLoaded
  | MessagePostReady
  | MessageOrientation;
