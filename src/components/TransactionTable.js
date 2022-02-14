import React, { useEffect, useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import Styles from '../styles';
import Button from './base/Button';
import Table from './base/Table';
import TableRow from './base/TableRow';
import TableData from './base/TableData';
import TableHeader from './base/TableHeader';
import TableBody from './base/TableBody';

function TransactionTable({ txns }) {

    const transactions = txns;
    const [displayedData, setDisplayedData] = useState(transactions);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortedType, setSortedType] = useState('desc')

    useEffect(() => {
        sort(displayedData)
        return () => {
            //
        }
    }, [sortedType])

    const sort = (data) => {
        if (sortedType === 'asc') {
            let sortedData = data.sort((a, b) => {
                if (a.amount > b.amount) {
                    return 1;
                }
                if (a.amount < b.amount) {
                    return -1;
                }
                return 0
            });
            setDisplayedData(sortedData)
        }
        else {
            let sortedData = data.sort((a, b) => {
                if (a.amount > b.amount) {
                    return -1;
                }
                if (a.amount < b.amount) {
                    return 1;
                }
                return 0
            });
            setDisplayedData(sortedData)

        }


    };

    const RenderItems = () => {
        return displayedData.map((item, index) => (
            <TableRow key={index}>
                <TableData>{item.date}</TableData>
                <TableData flex={3.5}>{item.description}</TableData>
                <TableData>{item.type === 1 ? 'Debit' : 'Credit'}</TableData>
                <TableData>{item.amount}</TableData>
                <TableData>{item.balance}</TableData>
            </TableRow>
        ))
    }


    const onSearch = (searchTerm) => {
        if (searchTerm === "") {
            setDisplayedData(transactions)
        } else {
            let searchresult = transactions.filter(transaction => transaction.date === searchTerm);
            if (searchresult.length > 0) {
                setDisplayedData(searchresult)
            }
        }
    }

    return (
        <View style={[Styles.layout_column, Styles.align_items_center, Styles.mt_50]}>
            <View style={[Styles.layout_row, Styles.align_items_center, Styles.justify_content_center]}>
                <Text style={[Styles.mr_10]}>Transaction Date</Text>
                <TextInput style={[Styles.px_10, Styles.input_large]}
                    testID="app-input" placeholder="YYYY-MM-DD" value={searchQuery} onChangeText={setSearchQuery} />
                <View>
                    <Button style={[Styles.mx_8, Styles.button, Styles.button_small]}
                        testID="submit-button" onPress={() => onSearch(searchQuery)}>
                        Filter
                    </Button>
                </View>
            </View>

            <View style={[Styles.card, Styles.mt_50, { minWidth: '65%' }]}>
                <Table>
                    <View>
                        <TableRow>
                            <TableHeader>Date</TableHeader>
                            <TableHeader flex={3.5}>Description</TableHeader>
                            <TableHeader>Type</TableHeader>
                            <TableHeader
                                testID="amount"
                                onPress={() => setSortedType(sortedType === 'asc' ? 'desc' : 'asc')}
                                style={[Styles.table_thead_tr_th_sortable]}>Amount ($)
                            </TableHeader>
                            <TableHeader>Available Balance</TableHeader>
                        </TableRow>
                        <TableBody testID="records-body">
                            <RenderItems />
                        </TableBody>
                    </View>
                </Table>
            </View>
        </View>
    );
}

export default TransactionTable;
