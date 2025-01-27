import { FlatList, StyleSheet, Text, View, Button, Modal } from 'react-native';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RenderCampsite from '../features/campsites/RenderCampsite';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { addComment, postComment } from '../features/comments/commentsSlice';
import { Rating, Input } from 'react-native-elements';

const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;
    const comments = useSelector((state) => state.comments);
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();

    const [ showModal, setShowModal ] = useState(false);
    const [rating, setRating] = useState(5); // Initialize rating state
    const [author, setAuthor] = useState(''); // Initialize author state
    const [text, setText] = useState(''); // Initialize text state

    const handleSubmit = () => {
        const newComment = {
            campsiteId: campsite.id,
            rating,
            author,
            text,
            id: comments.commentsArray.length // Ensure each comment has a unique id
        };
        dispatch(addComment(newComment));
        dispatch(postComment(newComment));
        setShowModal(!showModal);
    };

    const resetForm = () => {
        setRating(5);
        setAuthor('');
        setText('');
    };

    const renderCommentItem = ({ item }) => {
        return (
            <View style={styles.commentItem}>
                <Text style={{ fontSize: 14 }}>{item.text}</Text>
                <Rating
                    style={{ fontSize: 12, alignItems: 'flex-start', paddingVertical: '5%' }}    
                    startingValue={item.rating}
                    imageSize={10}
                    readOnly
                />
                <Text style={{ fontSize: 12 }}>
                    {`-- ${item.author}, ${item.date}`}
                </Text>
            </View>
        );
    };

    return (
        <View>
            <RenderCampsite
                campsite={campsite}
                onShowModal={() => setShowModal(!showModal)} // Pass the event handler as a prop
            />
                <FlatList
                    data={comments.commentsArray.filter(
                        (comment) => comment.campsiteId === campsite.id
                    )}
                    renderItem={renderCommentItem}
                    keyExtractor={(item) => item.id.toString()} // Ensure item.id is defined
                    contentContainerStyle={{
                        marginHorizontal: 20,
                        paddingVertical: 20
                    }}
                    ListHeaderComponent={
                        <>
                            <RenderCampsite
                                campsite={campsite}
                                isFavorite={favorites.includes(campsite.id)}
                                markFavorite={() => dispatch(toggleFavorite(campsite.id))}
                            />
                            <Text style={styles.commentsTitle}>Comments</Text>
                        </>
                    }
                />
                <Modal
                    animationType='slide'
                    transparent={false}
                    visible={showModal}
                    onRequestClose={() => setShowModal(!showModal)}
                >
                    <View style={styles.modal}>
                        <Rating
                            showRating
                            startingValue={rating}
                            imageSize={40}
                            onFinishRating={(rating) => setRating(rating)}
                            style={{ paddingVertical: 10 }}
                        />
                        <Input
                            placeholder='Author'
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            leftIconContainerStyle={{ paddingRight: 10 }}
                            onChangeText={(author) => setAuthor(author)}
                            value={author}
                        />
                        <Input
                            placeholder='Comment'
                            leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                            leftIconContainerStyle={{ paddingRight: 10 }}
                            onChangeText={(text) => setText(text)}
                            value={text}
                        />
                        <View style={{ margin: 10 }}>
                            <Button
                                onPress={() => {
                                    handleSubmit();
                                    resetForm();
                                }}
                                color='#5637DD'
                                title='Submit'
                            />
                        </View>
                        <View style={{ margin: 10 }}>
                            <Button
                                onPress={() => {
                                    setShowModal(!showModal);
                                    resetForm();
                                }}
                                color='#808080'
                                title='Cancel'
                            />
                        </View>
                    </View>
                </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    commentsTitle: {
        textAlign: 'center',
        backgroundColor: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#43484D',
        padding: 10,
        paddingTop: 30
    },
    commentItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }
});

export default CampsiteInfoScreen;