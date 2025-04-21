import appStyle from '@/AppStyles';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Svg, { Path, Circle, G } from 'react-native-svg';

interface CreditScoreMeterProps {
    score: number;
    previousScore?: number;
    onCheckScore?: () => void;
}

export const CreditScoreMeter: React.FC<CreditScoreMeterProps> = ({
    score,
    previousScore,
    onCheckScore,
}) => {
    const minScore = 300;
    const maxScore = 900;

    // Calculate the angle for the pointer based on the score
    const calculateAngle = (score: number) => {
        const percentage = (score - minScore) / (maxScore - minScore);
        return percentage * 180; // 180 degrees for semi-circle
    };

    const angle = calculateAngle(score);
    const scoreDiff = previousScore ? score - previousScore : 0;

    // Define score ranges and their corresponding colors
    const ranges = [
        { min: 300, max: 579, color: '#FF4B55', rating: 'Poor' },
        { min: 580, max: 669, color: '#FF8E50', rating: 'Fair' },
        { min: 670, max: 739, color: '#FFB946', rating: 'Good' },
        { min: 740, max: 799, color: '#90C355', rating: 'Very Good' },
        { min: 800, max: 900, color: '#4CAF50', rating: 'Excellent' }
    ];

    const getCurrentRating = (score: number) => {
        const range = ranges.find(r => score >= r.min && score <= r.max);
        return range || ranges[0];
    };

    const createArcPath = (startAngle: number, endAngle: number, radius: number = 80) => {
        const start = {
            x: 150 + radius * Math.cos((startAngle - 180) * Math.PI / 180),
            y: 160 + radius * Math.sin((startAngle - 180) * Math.PI / 180)
        };
        const end = {
            x: 150 + radius * Math.cos((endAngle - 180) * Math.PI / 180),
            y: 160 + radius * Math.sin((endAngle - 180) * Math.PI / 180)
        };
        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
    };

    return (
        <View style={appStyle.scrocontainer}>
            <View style={styles.meterContainer}>


                <Svg height="200" width='100%' viewBox="0 0 300 200">
                    <G>
                        {ranges.map((range, index) => {
                            const startAngle = calculateAngle(range.min);
                            const endAngle = calculateAngle(range.max);
                            return (
                                <Path
                                    key={range.rating}
                                    d={createArcPath(startAngle, endAngle)}
                                    stroke={range.color}
                                    strokeWidth="6"
                                    strokeLinecap="butt"
                                    fill="none"
                                />
                            );
                        })}

                        {/* Pointer */}
                        <Circle
                            cx={150 + Math.cos((angle - 180) * Math.PI / 180) * 80}
                            cy={160 + Math.sin((angle - 180) * Math.PI / 180) * 80}
                            r="5"
                            fill="#FFFFFF"
                            stroke="#000000"
                            strokeWidth="2"
                        />
                    </G>
                </Svg>

                <Image source={require('../../assets/slider/bgGraph.png')} style={{ width: '48%', height: 165, resizeMode: 'contain', position: 'absolute', marginTop: 74, zIndex: -1 }}></Image>



                <View style={styles.scoreContainer}>
                    <View style={styles.scoreChange}>
                        {scoreDiff > 0 && (
                            <Text style={styles.changeText}>↑ {scoreDiff}</Text>
                        )}
                    </View>
                    <Text style={styles.scoreText}>{score}</Text>
                    <View style={styles.ratingContainer}>
                        <Text style={[styles.ratingText, { color: getCurrentRating(score).color }]}>
                            {getCurrentRating(score).rating}
                        </Text>
                        <Text style={styles.infoIcon}>ⓘ</Text>
                    </View>
                </View>

                <View style={styles.rangeLabels}>
                    <Text style={styles.rangeText}>{minScore}</Text>
                    <Text style={styles.rangeText}>{maxScore}</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={onCheckScore}
            >
                <Text style={styles.buttonText}>Check Credit Score</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    
    meterContainer: {
        position: 'relative',
        alignItems: 'center',
        marginBottom: 50,
        marginTop: -73,
        width: "80%",
        transform: [{ scale: 1.3 }]
    },
    scoreContainer: {
        position: 'absolute',
        top: '66%',
        alignItems: 'center',
        // transform: [{ scale: 1.2 }]
    },
    scoreChange: {
        height: 20,
    },
    changeText: {
        color: '#4CAF50',
        fontSize: 12
    },
    scoreText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#1A237E',
        marginTop: -10
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -8,
        gap: 4,
    },
    ratingText: {
        fontSize: 10,
        marginTop: 4,
    },
    infoIcon: {
        fontSize: 12,
        color: '#666666',
        marginTop: 4
    },
    rangeLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
        marginTop: -34,
    },
    rangeText: {
        color: '#666666',
        fontSize: 12,
    },
    button: {
        backgroundColor: '#273283',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        width: '80%',
        maxWidth: 200,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});