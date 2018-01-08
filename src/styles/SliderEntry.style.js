import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.4;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({

    slideInnerContainer: {
        width: itemWidth,
        height: slideHeight,
        shadowOffset: { width: 0, height: 10, },
        shadowColor: 'black',
        shadowOpacity: Platform.OS === 'ios' ? 0.2 : 0,
        shadowRadius: Platform.OS === 'ios' ? 10 : 0,
        paddingHorizontal: itemHorizontalMargin,
        paddingBottom: 18, // needed for shadow
        elevation: Platform.OS === 'ios' ? 0 : 12,
        padding: Platform.OS === 'ios' ? 0 : 20,
        backgroundColor: Platform.OS === 'ios' ? 'transparent' : 'white'
    },
    test: {
        flex: 1,

        elevation: 12
    },
    imageContainer: {
        flex: 1,
        backgroundColor: Platform.OS === 'ios' ? '#fff' : '#f7f7f7',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,

    },
    imageContainerEven: {
        backgroundColor: 'green'
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderRadius: Platform.OS === 'ios' ? entryBorderRadius : 0,
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    // image's border radius is buggy on ios; let's hack it!
    radiusMask: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: entryBorderRadius,
        backgroundColor: Platform.OS === 'ios' ? 'white' : '#d7dbe2',
    },
    radiusMaskEven: {
        backgroundColor: 'purple'
    },
    textContainer: {
        justifyContent: 'center',
        paddingTop: 20 - entryBorderRadius,
        paddingBottom: 20,
        paddingHorizontal: 16,
        backgroundColor: Platform.OS === 'ios' ? 'white' : '#d7dbe2',
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
    textContainerEven: {
        backgroundColor: '#1a1917'
    },
    title: {
        color: '#1a1917',
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 0.5
    },
    titleEven: {
        color: 'white'
    },
    subtitle: {
        marginTop: 6,
        color: Platform.OS === 'ios' ? '#888888' : '#969696',
        fontSize: 12,
        fontStyle: 'italic'
    },
    subtitleEven: {
        color: 'rgba(255, 255, 255, 0.7)'
    }
});
