'use client'
import { NextPage } from 'next';
import React from 'react'
import ProfilesList from './_components/ProfilesList';

const page: NextPage = () => {
    return (
        <div>
            <ProfilesList />            
        </div>
    )
    
}

export default page;