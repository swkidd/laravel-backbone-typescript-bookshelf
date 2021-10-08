@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div id="app"></div>
    </div>
</div>
@endsection

@section('script')
<script src="{{ asset('js/main.js') }}"></script>
@endsection
