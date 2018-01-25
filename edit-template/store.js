/**
 * External dependencies
 */
import { createStore } from 'redux';
import { flowRight } from 'lodash';

/**
 * WordPress dependencies
 */
import { storePersist } from '@wordpress/utils';

/**
 * Internal dependencies
 */
//import reducer from './reducer';

function reducer( s ) {
	return s;
}

/**
 * Module constants
 */
const CUSTOMBERG_PREFERENCES_KEY = `GUTENBERG_PREFERENCES_EDIT_TEMPLATE_${ window.userSettings.uid }`;

/**
 * Creates a new instance of a Redux store.
 *
 * @param  {?*}          preloadedState Optional initial state
 * @return {Redux.Store}                Redux store
 */
function createReduxStore() {
	return createStore( reducer, { foo: 'bar' } );
//
//	const enhancers = [
//		storePersist( {
//			reducerKey: 'preferences',
//			storageKey: CUSTOMBERG_PREFERENCES_KEY,
//			defaults: {},
//		} ),
//	];
//
//	const store = createStore( reducer, {}, flowRight( enhancers ) );
//
//	return store;
}

export default createReduxStore;
