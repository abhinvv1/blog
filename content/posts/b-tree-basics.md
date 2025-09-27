## Overview

Today we are going to talk about B-Trees: what exactly are B-trees? Why do we need them at the first place? What problems they solve and How are used in the modern world. There are a lot of Q/A we'll be doing so let's just jump right into it.

Before going forward, we must know that B-trees are used in storage structures. Even most of the modern day database systems uses B-tree. The storage structures can be categorized into two groups: mutable and immutable ones. For mutable storage structures we need to update the data records directly at their locations in the target file, hence, we use something called in-place update mechanism. By target file we mean the actual storage file where the data record is present on the disk.
