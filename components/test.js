import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity,Alert,Button } from 'react-native'
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons'

export default function test() {
  const [GameState, SetGameState] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ])
  const [currentPlayer, GetCurrentPlayer] = useState(1)

  const initializeGame = () => {
    SetGameState([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ])
    GetCurrentPlayer(1)
  }

  const renderIcon = (row, col) => {
    let value = GameState[row][col]
    switch (value) {
      case 1:
        return <Icon name="close" style={styles.tileX} />
      case -1:
        return <Icon name="circle-outline" style={styles.tileO} />
      default:
        return <View />
    }
  }

  const onTilePress = (row, col) => {
    //Don't allow tiles to change...
    let value = GameState[row][col]
    if (value !== 0) {
      return
    }

    //Grab current player...
    let player = currentPlayer

    // Set the correct tile...
    let arr = GameState.slice()
    arr[row][col] = player
    SetGameState(arr)

    // Switch to other player...
    let nextPlayer = player === 1 ? -1 : 1
    GetCurrentPlayer(nextPlayer)

    let winner = getWinner()
    if(winner == 1 ){
        Alert.alert('player1 is the winner')
        initializeGame()
    }
    else if (winner == -1){
        Alert.alert('player2 is the winner')
        initializeGame()
    }
  }

  // Returns 1 if Player 1 won , -1 if player 2 won , or a 0 if no one has won
  const getWinner = () => {
    const NUM_TILES = 3
    let arr= GameState
    let sum

    //check rows...
    for (let i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2]
      if (sum == 3) {
        return 1
      } else if (sum == -3) {
        return -1
      }
    }
    // check columns...
    for (let i = 0; i < NUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i]
      if (sum == 3) {
        return 1
      } else if (sum == -3) {
        return -1
      }
    }
    // check the diagonals

    sum = arr[0][0] + arr[1][1] + arr[2][2]
    if (sum == 3) {
      return 1
    } else if (sum == -3) {
      return -1
    }

    sum = arr[2][0] + arr[1][1] + arr[0][2]
    if (sum == 3) {
      return 1
    } else if (sum == -3) {
      return -1
    }

    //There are no winners
    return 0
  }

  const onNewGamePress =()=>{
    initializeGame()
  }

  useEffect(() => {
    initializeGame()
  }, [])

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => {
            onTilePress(0, 0)
          }}
          style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}
        >
          {renderIcon(0, 0)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onTilePress(0, 1)
          }}
          style={[styles.tile, { borderTopWidth: 0 }]}
        >
          {renderIcon(0, 1)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onTilePress(0, 2)
          }}
          style={[styles.tile, { borderRightWidth: 0, borderTopWidth: 0 }]}
        >
          {renderIcon(0, 2)}
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => {
            onTilePress(1, 0)
          }}
          style={[styles.tile, { borderLeftWidth: 0 }]}
        >
          {renderIcon(1, 0)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onTilePress(1, 1)
          }}
          style={styles.tile}
        >
          {renderIcon(1, 1)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onTilePress(1, 2)
          }}
          style={[styles.tile, { borderRightWidth: 0 }]}
        >
          {renderIcon(1, 2)}
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => {
            onTilePress(2, 0)
          }}
          style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]}
        >
          {renderIcon(2, 0)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onTilePress(2, 1)
          }}
          style={[styles.tile, { borderBottomWidth: 0 }]}
        >
          {renderIcon(2, 1)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onTilePress(2, 2)
          }}
          style={[styles.tile, { borderRightWidth: 0, borderBottomWidth: 0 }]}
        >
          {renderIcon(2, 2)}
        </TouchableOpacity>
      </View>
          <View style={{paddingTop:50}}>
      <Button title='New Game' onPress ={onNewGamePress} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  tile: {
    borderWidth: 10,
    width: 100,
    height: 100,
  },
  tileX: {
    color: 'red',
    fontSize: 70,
    marginLeft: 5,
  },
  tileO: {
    color: '#aec',
    fontSize: 70,
    marginLeft: 5,
  },
})
