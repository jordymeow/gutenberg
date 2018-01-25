/**
 * External dependencies
 */
import { connect, createProvider } from 'react-redux';

/**
 * WordPress dependencies
 */
import { render } from '@wordpress/element';
import { IconButton, Popover, PanelBody, Panel } from '@wordpress/components';
import {
	BlockList,
	EditorHistoryRedo,
	EditorHistoryUndo,
	EditorNotices,
	EditorProvider,
	Inserter,
	MultiBlocksSwitcher,
	NavigableToolbar,
	PostTitle,
	PostPreviewButton,
	BlockInspector,
} from '@wordpress/editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import store from './store';
import { toggleSidebar } from './store/actions';
import { isSidebarOpened } from './store/selectors';

export function initializeTemplateEditor( id, post, settings ) {
	const target = document.getElementById( id );

	const TemplateProvider = createProvider( 'edit-template' );

	render(
		<EditorProvider settings={ settings } post={ post }>
			<TemplateProvider store={ store }>
				<Layout />
			</TemplateProvider>
		</EditorProvider>,
		target
	);
}

const applyLayoutConnect = connect(
	( state ) => ( {
		showSidebar: isSidebarOpened( state ),
	} ),
	undefined,
	undefined,
	// Temporary:
	{ storeKey: 'edit-template' }
);

const Layout = applyLayoutConnect( ( { showSidebar } ) => (
	<div className="edit-post-layout">
		{ /*<UnsavedChangesWarning /> */ }
		<Header />
		<div className="edit-post-layout__content" role="region" aria-label={ __( 'Editor content' ) } tabIndex="-1">
			<EditorNotices />
			<div className="edit-post-layout__editor">
				<div className="edit-post-visual-editor">
					<PostTitle />
					<BlockList showContextualToolbar={ true } />
				</div>
			</div>
		</div>
		{ showSidebar && <Sidebar /> }
		<Popover.Slot />
	</div>
) );

const applyHeaderConnect = connect(
	undefined,
	{ toggleSidebar },
	undefined,
	// Temporary:
	{ storeKey: 'edit-template' }
);
const Header = applyHeaderConnect( ( props ) => {
	return (
		<div
			role="region"
			aria-label={ __( 'Editor toolbar' ) }
			className="edit-post-header"
			tabIndex="-1"
		>
			<NavigableToolbar
				className="edit-post-header-toolbar"
				aria-label={ __( 'Editor Toolbar' ) }
			>
				<Inserter position="bottom right" />
				<EditorHistoryUndo />
				<EditorHistoryRedo />
				<MultiBlocksSwitcher />
			</NavigableToolbar>
			<div className="edit-post-header__settings">
				<TemplateSavedState />
				<TemplatePreviewButton />
				<IconButton
					icon="admin-generic"
					label={ __( 'Settings' ) }
					onClick={ props.toggleSidebar }
				/>
			</div>
		</div>
	);
} );

function Sidebar() {
	return (
		<div className="edit-post-sidebar">
			<Panel>
				<BlockInspector />
			</Panel>
		</div>
	);
}

function TemplateSavedState() {
	return null;
}
function TemplatePreviewButton() {
	return <PostPreviewButton />;
}

initializeTemplateEditor(
	'editor',
	{
		content: { raw: '', rendered: '' },
		title: { raw: '', rendered: '' },
		type: 'wp-template',
	}
);

//{id: 1176, date: "2018-01-02T16:02:57", date_gmt: "2018-01-02T16:02:57", guid: {…}, modified: "2018-01-20T12:35:59", …}author: 1categories: [1]comment_status: "closed"content: {raw: "<!-- wp:core/paragraph -->↵<p>Illo dolor reiciendi…que ea iusto qui.</p>↵<!-- /wp:core/paragraph -->", rendered: "↵<p>Illo dolor reiciendis <a href="http://localhos…sectetur commodi ducimus neque ea iusto qui.</p>↵", protected: false}date: "2018-01-02T16:02:57"date_gmt: "2018-01-02T16:02:57"excerpt: {raw: "", rendered: "<p>Illo dolor reiciendis quaerat voluptate laborio…io ab. Ipsa sit sed reprehenderit [&hellip;]</p>↵", protected: false}featured_media: 0format: "standard"guid: {rendered: "http://localhost:8000/?p=1176", raw: "http://localhost:8000/?p=1176"}id: 1176link: "http://localhost:8000/?p=1176"meta: []modified: "2018-01-20T12:35:59"modified_gmt: "2018-01-20T12:35:59"password: ""ping_status: "closed"revisions: {count: 149, last_id: 1507}slug: "texo"status: "draft"sticky: falsetags: []template: ""title: {raw: "Texō", rendered: "Texō"}type: "post"_links: {self: Array(1), collection: Array(1), about: Array(1), author: Array(1), replies: Array(1), …}__proto__: Object
