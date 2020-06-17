import React, {useState, useEffect} from 'react'
import { SafeAreaView, View, Text, FlatList,  StyleSheet, StatusBar, TouchableOpacity } from 'react-native'

import api from './services/api'

export default function App() {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        api.get('projects').then(response => {
            console.log(response.data)
            setProjects(response.data)
        })
    },[])

    async function handleAddProject() {
        const response = await api.post('projects', {
            title: `GoStack 12 - Rocketseat`,
            owner: 'Fabiano S. Ramos'
        })
        const project = response.data
        setProjects([...projects, project])
    }

    return (
        <>
            <StatusBar barStyle='light-content' backgroundColor='#7159c1' />
            <SafeAreaView style={styles.container}>
            <FlatList
                data={projects}
                keyExtractor={project => project.id}
                renderItem={({ item: project }) => (
                    <View style={styles.card}>
                        <Text style={styles.title}>
                            {project.title}
                        </Text> 
                    </View>                     
                )}
            />
            <TouchableOpacity 
                style={styles.button} 
                onPress={handleAddProject}
            >
                <Text style={styles.buttonText}>Adicionar Projeto</Text>
            </TouchableOpacity>
            </SafeAreaView>                
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#7159c1',
    },
    title: {
        color: '#7159c1',
        fontSize: 20,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#FFF',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color:'#7159c1'
    },
    card: {
        margin: 10,
        padding: 25,
        borderRadius: 12,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})