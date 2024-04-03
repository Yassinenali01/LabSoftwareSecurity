import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, SafeAreaView, ScrollView } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage'; // Import EncryptedStorage
import Note from './components/Note';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TRootStackParamList } from './App';

export interface INote {
	title: string;
	text: string;
}

interface IProps {}

interface IState {
	notes: INote[];
	newNoteTitle: string;
	newNoteEquation: string;
}

type TProps = NativeStackScreenProps<TRootStackParamList, 'Notes'> & IProps;

export default class Notes extends React.Component<TProps, IState> {
	constructor(props: Readonly<TProps>) {
		super(props);

		this.state = {
			notes: [],
			newNoteTitle: '',
			newNoteEquation: ''
		};

		this.onNoteTitleChange = this.onNoteTitleChange.bind(this);
		this.onNoteEquationChange = this.onNoteEquationChange.bind(this);
		this.addNote = this.addNote.bind(this);
	}

	public async componentDidMount() {
		const existing = await this.getStoredNotes(); 

		this.setState({ notes: existing });
	}

	public async componentWillUnmount() {
		this.storeNotes(this.state.notes);
	}

	private async getStoredNotes(): Promise<INote[]> {
		const suffix = this.props.route.params.user.username + '-' + this.props.route.params.user.password;
		// Retrieve the notes from storage
		try {
			const value = await EncryptedStorage.getItem('notes-' + suffix); 
			if (value !== null) {
				return JSON.parse(value);
			} else {
				return [];
			}
		} catch (error) {
			console.error('Error retrieving data:', error); // Added error handling
			return [];
		}
	}

	private async storeNotes(notes: INote[]) {
		const suffix = this.props.route.params.user.username + '-' + this.props.route.params.user.password;
		// Store the notes securely
		try {
			const jsonValue = JSON.stringify(notes);
			await EncryptedStorage.setItem('notes-' + suffix, jsonValue); 
			console.log('Data stored securely.');
		} catch (error) {
			console.error('Error storing data:', error); // Added error handling
		}
	}

	private onNoteTitleChange(value: string) {
		this.setState({ newNoteTitle: value });
	}

	private onNoteEquationChange(value: string) {
		this.setState({ newNoteEquation: value });
	}

	private addNote() {
		const { newNoteTitle, newNoteEquation } = this.state;

		// Input validation
		if (!newNoteTitle.trim() || !newNoteEquation.trim()) {
			Alert.alert('Error', 'Title and equation cannot be empty.');
			return;
		}

		// Sanitize equation input
		const sanitizedEquation = newNoteEquation.replace(/[^0-9+\-*/().]/g, ''); // Allow only basic arithmetic characters

		const note: INote = {
			title: newNoteTitle,
			text: sanitizedEquation,
		};

		this.setState({ 
			notes: [...this.state.notes, note],
			newNoteTitle: '',
			newNoteEquation: ''
		});
	}

	public render() {
		return (
			<SafeAreaView>
				<ScrollView contentInsetAdjustmentBehavior="automatic">
					<View style={styles.container}>
						<Text style={styles.title}>
							{'Math Notes: ' + this.props.route.params.user.username}
						</Text>
						<TextInput
							style={styles.titleInput}
							value={this.state.newNoteTitle}
							onChangeText={this.onNoteTitleChange}
							placeholder="Enter your title"
						/>
						<TextInput
							style={styles.textInput}
							value={this.state.newNoteEquation}
							onChangeText={this.onNoteEquationChange}
							placeholder="Enter your math equation"
						/>
						<Button title="Add Note" onPress={this.addNote} />

						<View style={styles.notes}>
							{this.state.notes.map((note, index) => (
								<Note key={index} title={note.title} text={note.text} />
							))}
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	titleInput: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		marginBottom: 10,
	},
	textInput: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		marginBottom: 10,
	},
	notes: {
		marginTop: 15
	},
});
